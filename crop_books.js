const Jimp = require('jimp');

async function processImages() {
    try {
        console.log("Processing front cover...");
        const front = await Jimp.read('images/front_cover.png');
        const fW = front.bitmap.width;
        const fH = front.bitmap.height;

        const fMinX = fW * 0.056;
        const fMinY = fH * 0.148;
        const fCropW = fW * 0.315;
        const fCropH = fH * 0.848;

        front.crop(fMinX, fMinY, fCropW, fCropH);
        await front.writeAsync('images/front_cropped.png');
        console.log("Front cropped successfully.");

        console.log("Processing back cover...");
        const back = await Jimp.read('images/back_cover.png');
        const bW = back.bitmap.width;
        const bH = back.bitmap.height;

        const bMinX = bW * 0.038;
        const bMinY = bH * 0.212;
        const bCropW = bW * 0.271;
        const bCropH = bH * 0.753;

        back.crop(bMinX, bMinY, bCropW, bCropH);
        await back.writeAsync('images/back_cropped.png'); // Saving as PNG to match logic
        console.log("Back cropped successfully.");

    } catch (e) {
        console.error("Error cropping:", e);
    }
}

processImages();
