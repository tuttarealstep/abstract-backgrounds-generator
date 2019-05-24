let canvas = document.getElementById('canvas')
let ctx = canvas.getContext("2d")

let bgColor = [
    "#f953c6",
    "#b91d73",
    "#7F7FD5",
    "#86A8E7",
    "#91EAE4",
    "#240b36",
    "#c31432",
    "#f5af19",
    "#f12711",
    "#659999",
    "#6be585",
    "#dd3e54",
    "#8360c3",
    "#2ebf91",
    "#544a7d",
    "#ffd452",
    "#009FFF",
    "#ec2F4B",
    "#654ea3",
    "#eaafc8",
    "#FF416C",
    "#8A2387",
    "#E94057",
    "#F27121",
    "#a8ff78",
    "#78ffd6",
    "#c94b4b",
    "#4b134f",
    "#23074d",
    "#cc5333",
    "#fffbd5",
    "#b20a2c",
    "#0f0c29",
    "#302b63",
    "#24243e",
    "#a18cd1",
    "#fbc2eb",
    "#30cfd0",
    "#330867",
    "#2af598",
    "#009efd",
    "#6a11cb",
    "#2575fc",
    "#0ba360",
    "#3cba92"
]

function randomColor(colors) {
    return colors[Math.floor(Math.random() * colors.length)];
}

function createGradient(startX, startY, stopX, stopY, nColors = 2) {
    let grd = ctx.createLinearGradient(startX, startY, stopX, stopY)

    for (let i = 0; i < nColors; i++) {
        grd.addColorStop(i, randomColor(bgColor))
    }

    return grd
}

function createRadialGradient(startX, startY, r0, stopX, stopY, r1, nColors = -1) {
    let grd = ctx.createRadialGradient(startX, startY, r0, stopX, stopY, r1)

    if (nColors == -1) {
        nColors = getRandomInt(2, 5)
    }

    for (let i = 0; i < nColors; i++) {
        grd.addColorStop(i / nColors, randomColor(bgColor))
    }

    return grd
}

function setBgColor(ctx, startX, startY, stopX, stopY) {
    //Set bg    
    ctx.fillStyle = randomColor(bgColor);
    ctx.fillRect(startX, startY, stopX, stopY);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function getUrlParameters() {
    return new URL(window.location.href).searchParams
}


canvas.width = getUrlParameters().get("w") || window.innerWidth;
canvas.height = getUrlParameters().get("h") || window.innerHeight;

let height = canvas.height
let width = canvas.width

let gradient = null
let r0 = 0
let r1 = 0
let grdRadialDirection = 0

/**
 * BG Mode:
 * 0 = linear gradient
 * 1 = radial gradient
 * 2 = normal bg
 */
let bgMode = parseInt(getUrlParameters().get("bgMode")) || getRandomInt(0, 3)

/**
 * Enable bg details:
 * 0 = false
 * 1 = true
 */
 let enableBgDetail = (getUrlParameters().get("details") ? (getUrlParameters().get("details") == 1 ? true : false) : true)

let numberOfDetails = parseInt(getUrlParameters().get("nDetails")) || 3

switch (bgMode) {
    case 0:
        let grdDirection = getRandomInt(0, 12)
        switch (grdDirection) {
            case 0:
                g = createGradient(width, 0, 0, 0)
                break;
            case 1:
                g = createGradient(0, height, 0, 0)
                break;
            case 2:
                g = createGradient(0, 0, width, 0)
                break;
            case 3:
                g = createGradient(0, 0, 0, height)
                break;
            case 4:
                g = createGradient(0, 0, width, height)
                break;
            case 5:
                g = createGradient(width, height, 0, 0)
                break;
            case 6:
                g = createGradient(width, 0, 0, height)
            case 7:
                g = createGradient(0, height, width, 0)
                break;
            case 8:
                g = createGradient(width, height, 0, height)
                break;
            case 9:
                g = createGradient(width, height, width, 0)
                break;
            case 10:
                g = createGradient(width, 0, width, height)
                break;
            case 11:
                g = createGradient(0, height, width, height)
                break;
        }
        ctx.fillStyle = g
        ctx.fillRect(0, 0, width, height);
        break;
    case 1:

        grdRadialDirection = getRandomInt(0, 12)
        r0 = 0
        r1 = Math.max(width, height)

        switch (grdRadialDirection) {
            case 0:
                g = createRadialGradient(width, 0, r0, 0, 0, r1)
                break;
            case 1:
                g = createRadialGradient(0, height, r0, 0, 0, r1)
                break;
            case 2:
                g = createRadialGradient(0, 0, r0, width, 0, r1)
                break;
            case 3:
                g = createRadialGradient(0, 0, r0, 0, height, r1)
                break;
            case 4:
                g = createRadialGradient(0, 0, r0, width, height, r1)
                break;
            case 5:
                g = createRadialGradient(width, height, r0, 0, 0, r1)
                break;
            case 6:
                g = createRadialGradient(width, 0, r0, 0, height, r1)
            case 7:
                g = createRadialGradient(0, height, r0, width, 0, r1)
                break;
            case 8:
                g = createRadialGradient(width, height, r0, 0, height, r1)
                break;
            case 9:
                g = createRadialGradient(width, height, r0, width, 0, r1)
                break;
            case 10:
                g = createRadialGradient(width, 0, r0, width, height, r1)
                break;
            case 11:
                g = createRadialGradient(0, height, r0, width, height, r1)
                break;
        }
        ctx.fillStyle = g
        ctx.fillRect(0, 0, width, height);
        break;
    case 2:
        setBgColor(ctx, 0, 0, width, height)
        break;
}

if (enableBgDetail) {
    for (let j = 0; j < numberOfDetails; j++) {

        /**
         * Detail Mode:
         * 0 - no detail
         * 1 - radial 
         * 2 - cirlce
         */
        let detailMode = parseInt(getUrlParameters().get("detailMode")) || getRandomInt(0, 3)

        switch (detailMode) {
            case 0:
                //null
                break;
            case 1:

                grdRadialDirection = getRandomInt(0, 12)
                r0 = getRandomInt(0, width + 1)
                r1 = getRandomInt(0, height + 1)

                switch (grdRadialDirection) {
                    case 0:
                        g = createRadialGradient(width, 0, r0, 0, 0, r1)
                        break;
                    case 1:
                        g = createRadialGradient(0, height, r0, 0, 0, r1)
                        break;
                    case 2:
                        g = createRadialGradient(0, 0, r0, width, 0, r1)
                        break;
                    case 3:
                        g = createRadialGradient(0, 0, r0, 0, height, r1)
                        break;
                    case 4:
                        g = createRadialGradient(0, 0, r0, width, height, r1)
                        break;
                    case 5:
                        g = createRadialGradient(width, height, r0, 0, 0, r1)
                        break;
                    case 6:
                        g = createRadialGradient(width, 0, r0, 0, height, r1)
                    case 7:
                        g = createRadialGradient(0, height, r0, width, 0, r1)
                        break;
                    case 8:
                        g = createRadialGradient(width, height, r0, 0, height, r1)
                        break;
                    case 9:
                        g = createRadialGradient(width, height, r0, width, 0, r1)
                        break;
                    case 10:
                        g = createRadialGradient(width, 0, r0, width, height, r1)
                        break;
                    case 11:
                        g = createRadialGradient(0, height, r0, width, height, r1)
                        break;
                }
                ctx.fillStyle = g
                ctx.fillRect(0, 0, width, height);
                break;
            case 2:
                let detailsMode2x = Math.floor(Math.random() * width);
                let detailsMode2y = Math.floor(Math.random() * height);
                let detailsMode2Radius = getRandomInt(0, Math.min(width, height) + 1);

                ctx.beginPath();
                ctx.arc(detailsMode2x, detailsMode2y, detailsMode2Radius, Math.PI * 2, 0, false);


                let bgModeCirlceDM2 = getRandomInt(0, 5)
                switch (bgModeCirlceDM2) {
                    case 0:
                        ctx.fillStyle = createGradient(0, 0, 0, height)
                        break;
                    case 1:
                        ctx.fillStyle = createGradient(0, 0, width, 0)
                        break;
                    case 2:
                        ctx.fillStyle = createGradient(width, 0, 0, 0)
                        break;
                    case 3:
                        ctx.fillStyle = createGradient(0, height, 0, 0)
                        break;
                    case 4:
                        ctx.fillStyle = randomColor(bgColor);
                        break;
                }

                ctx.fill();
                break
        }
    }
}

