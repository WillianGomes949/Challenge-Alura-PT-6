const apiKey = "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";
const maxImages = 6;

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function toggleGenerateButton(disabled) {
    document.getElementById("generate").disabled = disabled;
}

function clearImageGrid() {
    document.getElementById("image-grid").innerHTML = "";
}

async function query(data, pt, en) {
    const inputElement = document.getElementById("user-prompt-1");

    try {
        const response = await fetch(
            "https://api-inference.huggingface.co/models/Narrativa/mbart-large-50-finetuned-opus-pt-en-translation",
            {
                headers: { Authorization: `Bearer ${apiKey}` },
                method: "POST",
                body: JSON.stringify({
                    text: data,
                    src_lang: pt,
                    tgt_lang: en
                }),
            }
        );
        const result = await response.json();
        inputElement.value = result[0].src_tag; // Substitua 'translated_text' pelo campo correto da sua API
        inputElement.style.display = 'block';
    } catch (error) {
        console.error(error);
    }
}

query("Casa verde", "pt", "en", "user-prompt");

async function generateImages(input) {
    toggleGenerateButton(true);
    clearImageGrid();

    const loading = document.getElementById("loading");
    loading.style.display = "block";

    for (let i = 0; i < maxImages; i++) {
        const randomNumber = getRandomNumber(1, 10000);
        const prompt = `${input} ${randomNumber}`;

        try {
            const response = await fetch(
                "https://api-inference.huggingface.co/models/prompthero/openjourney",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${apiKey}`,
                    },
                    body: JSON.stringify({ inputs: prompt }),
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const blob = await response.blob();
            const imgUrl = URL.createObjectURL(blob);

            const img = document.createElement("img");
            img.src = imgUrl;
            img.alt = `art-${i + 1}`;
            img.onclick = () => downloadImage(imgUrl, i);
            document.getElementById("image-grid").appendChild(img);
        } catch (error) {
            console.error(error);
        }
    }

    loading.style.display = "none";
    toggleGenerateButton(false);
}

document.getElementById("generate").addEventListener('click', () => {
    const input = document.getElementById("user-prompt").value;
    generateImages(input);
});

document.getElementById("user-prompt-1").addEventListener('input', () => {
    const input1 = document.getElementById("user-prompt-1").value;
    document.getElementById("user-prompt").value = input1;
});


function downloadImage(imgUrl, imageNumber) {
    const link = document.createElement("a");
    link.href = imgUrl;
    link.download = `image-${imageNumber + 1}.jpg`;
    link.click();
}


