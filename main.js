function mistralChat(prompt) {
    return fetch("https://api.mistral.ai/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": "Bearer ",
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model: "ministral-8b-2410",
            messages: [
                { role: "system", content: "You are a concise assistant." },
                { role: "user", content: prompt }
            ],
            temperature: 0.7,
            max_tokens: 1500
        })
    })
        .then(response => response.json())
        .then(function(data) {
            const outputDiv = document.getElementById('training_plan');
            const answer = data.choices[0].message.content;
            outputDiv.innerText = answer;
            console.log(data.choices[0].message.content);
        })
        .catch(error => {
            console.error("Error:", error);
            document.getElementById('training_plan').innerText = "Sorry, an error occurred.";
        });
}


const btn = document.getElementById('calc-btn');

// Tilføj event listener (lyt efter klik)
btn.addEventListener('click', function() {
    const name = document.getElementById('name').value;
    const birthday = document.getElementById('birthday').value;
    const weightVal = document.getElementById('weight').value;
    const heightVal = document.getElementById('height').value;
    const dreamBody = document.getElementById('desire').value;


    console.log("Name:", name);
    console.log("Birthday:", birthday);

    const weight = Number(weightVal)
    const height = Number(heightVal)

    const sportSelect = document.getElementById('sport');
    const selectedSport = sportSelect.value;
    console.log("Selected sport:", selectedSport);


    const genderRadio = document.getElementById('gender');
    let genderValue = "";
    for (const radio of genderRadio) {
        if(radio.checked) {
            genderValue = radio.value;
            break;
        }
    }

    console.log("Selected gender:", genderValue);

    const bmiRes = document.getElementById("bmi_res")

    // image
    const pic = document.getElementById("fileUpload");

    let imageName = "";
    if (pic.files.length === 0) {
        // No image selected
        console.log("No image chosen.");
    } else {
        // Image selected
        imageName = pic.files[0].name;
        console.log("Image chosen!", imageName);
    }


    if (weight > 0 && height > 0) {
        const heightInMeter = height / 100;
        const bmi = weight / (heightInMeter * heightInMeter);

        console.log("Your BMI is: " + bmi.toFixed(1));

        bmiRes.innerText = `Your BMI is: ${bmi.toFixed(1)}`;

        let prompt = `
            the person name is: ${name}
            the person birthday is: ${birthday}
            the person body dream is: ${dreamBody}
            the person sports interest is: ${selectedSport}
            the person weight is: ${weight} in kilogram
            the person height is: ${height} in CM
            the person gender is: ${genderValue}
            so the person BMI is: ${bmi.toFixed(1)}
            `;
        if (imageName) {
            prompt+=`
            this is the person body picture: ${imageName}`;
        }
        prompt+=`  
    Please create a comprehensive, professional training plan based on the above information as age, gender and sports interests. 
    Include:

    - A full weekly workout schedule tailored to the person's sports interest and goals.
    - Exercise types, sets, reps, and recommended intensity.
    - Suggestions for warm-up and cool-down routines.
    - Nutritional guidance aligned with the training plan.
    - Recovery tips to maximize progress.
    -Adaptations for the person's gender, BMI, and body goals.

    Write the plan clearly and practically, suitable for someone aiming to improve fitness and health based on these specifications.
`;

        console.log(prompt);

        mistralChat(prompt);

    } else {
        console.log("Enter positiv numbers for weight and height");
        bmiRes.innerText = "Enter positiv numbers for weight and height.";
    }



document.getElementById('fileUpload').addEventListener('change', function () {
    let fileName = this.files[0] ? this.files[0].name : 'No picture chosen';
    document.getElementById('fileName').textContent = 'Selected file: ' + fileName;
})});


