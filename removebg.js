const { removeBackground } = require('@imgly/background-removal-node');
const fs = require('fs');

async function processImage(inputPath, outputPath) {
    try {
        console.log(`Processing ${inputPath}...`);
        const inputBuffer = fs.readFileSync(inputPath);

        // Remove background returns a Uint8Array
        const result = await removeBackground(inputBuffer);
        fs.writeFileSync(outputPath, Buffer.from(result.base64img, 'base64')); // result might have base64img depending on version, wait: let's use the buffer directly

        console.log(`Saved ${outputPath}`);
    } catch (err) {
        console.error(`Error on ${inputPath}:`, err);
    }
}

async function main() {
    try {
        // According to correct @img/remove-background usage:
        // const blob = await removeBackground(imageBuffer);
        // But since this is node, it returns a Blob or Uint8Array. 
        // Let's implement standard parsing.

        console.log('Processing Front...');
        const frontResult = await removeBackground('images/front_cover.png');

        // In node environment, if it's a Blob, we need arrayBuffer
        let bufferFront;
        if (frontResult.arrayBuffer) {
            bufferFront = Buffer.from(await frontResult.arrayBuffer());
        } else {
            bufferFront = Buffer.from(frontResult);
        }
        fs.writeFileSync('images/front_cover_nobg.png', bufferFront);

        console.log('Processing Back...');
        const backResult = await removeBackground('images/back_cover.png');
        let bufferBack;
        if (backResult.arrayBuffer) {
            bufferBack = Buffer.from(await backResult.arrayBuffer());
        } else {
            bufferBack = Buffer.from(backResult);
        }
        fs.writeFileSync('images/back_cover_nobg.png', bufferBack);

        console.log("Done extracting books!");
    } catch (e) {
        console.error(e);
    }
}

main();
