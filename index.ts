import * as fs from 'fs';
import * as path from 'path';

function readNumbersFromFile(filePath: string): number[] {
    const data = fs.readFileSync(filePath, 'utf-8');
    return data.split('\n').map(Number).filter(num => !isNaN(num));
}

interface AnalysisResult {
    sum: number;
    avg: number;
    max: number;
    min: number;
}

function analyzeNumbers(numbers: number[]): AnalysisResult {
    const sum = numbers.reduce((a, b) => a + b, 0);
    const avg = sum / numbers.length;
    const max = Math.max(...numbers);
    const min = Math.min(...numbers);
    return { sum, avg, max, min };
}

function measurePerformance(filePath: string): void {
    const start = process.hrtime();
    const numbers = readNumbersFromFile(filePath);
    const results = analyzeNumbers(numbers);
    const end = process.hrtime(start);
    
    console.log(`Results for ${path.basename(filePath)}`);
    console.log(results);
    console.log(`Execution time: ${end[0]}s ${end[1] / 1e6}ms`);
}

// Run analysis
const filePath = 'small.txt'; // Change to your file
measurePerformance(filePath);
