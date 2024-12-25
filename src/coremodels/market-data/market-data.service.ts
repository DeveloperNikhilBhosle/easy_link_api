import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { bhav_copy_ip } from './market-data.dto';
import axios from 'axios';
import * as Papa from 'papaparse';


@Injectable()
export class MarketDataService {

    async getBhavCopy(ip: bhav_copy_ip) {
        const url = 'https://www.bseindia.com/download/BhavCopy/Equity/BhavCopy_BSE_CM_0_0_0_' + ip.date + '_F_0000.CSV';

        try {
            // console.log(" Fetch the CSV content from the URL using axios")
            const response = await axios.get(url, {
                responseType: 'text', // Ensure it's treated as plain text (CSV format)
            });

            // console.log("1kdnkedwndnwendw", response)
            const csvData = response.data;
            // console.log("2")
            // Use PapaParse to parse the CSV data into JSON format
            const parsedData = await new Promise<any[]>((resolve, reject) => {
                Papa.parse(csvData, {
                    header: true,  // Assumes the first row contains the headers
                    skipEmptyLines: true,  // Skips empty lines
                    complete: (result) => resolve(result.data),  // Resolves the JSON data
                    error: (err) => reject(err),  // Rejects in case of error
                });
            });
            // console.log("3")
            // console.log(res, 'response');


            // Filtering necessary records
            const necessaryFields = ['ISIN', 'TckrSymb', 'FinInstrmNm', 'OpnPric', 'HghPric', 'LwPric', 'ClsPric', 'LastPric', 'SttlmPric'];  // Example: keep only these fields
            const filteredRecords = parsedData.map(record => {
                let filteredRecord = {};
                necessaryFields.forEach(field => {
                    if (record[field]) {
                        filteredRecord[field] = record[field];
                    }
                });
                return filteredRecord;
            });

            // Optionally, filter out empty records (if any)
            const cleanedRecords = filteredRecords.filter(record => Object.keys(record).length > 0);

            // Log the filtered and cleaned records
            // console.log(cleanedRecords);

            // Calculate the start and end index for pagination
            const startIndex = (ip.page_no - 1) * ip.page_size;
            const endIndex = startIndex + ip.page_size;

            // Slice the array to get only the relevant page of records
            const paginatedData = cleanedRecords.slice(startIndex, endIndex);

            // console.log("Done with the filtered records")

            return {
                statusCode: 200,
                message: "Success",
                data: {
                    total: cleanedRecords.length,
                    records: paginatedData
                }
            }
        } catch (error: any) {

            console.log(error.status, 'error processing')
            // console.error('Error fetching or parsing the CSV:', error);
            if (error.status === 404) {

                throw new NotFoundException(
                    'Data not found for the given date Please verify the date (Please provide the date in yyyyMMdd format (e.g., 20240731)), Kindly note that the date should not fall on a public government holiday or a market closure date.'
                );
            }
            throw new InternalServerErrorException('Failed to fetch and parse CSV');
        }
    }
}
