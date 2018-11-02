
n () {
    "use strict";

    $('#button-education').on('click', function () {
        const $educationList = $('#education-list');
        const $educationInput = $('#education');

        let val = $educationInput.val();

        if (val === '')
            val = $educationInput.attr('placeholder');

        let educationElement = `
            <li class="list-group-item">
                <span>${val}</span>
            </li>
            
        `;

        $educationList.append(educationElement);

        $educationInput.val('');
    });

    $('#button-experience').on('click', function () {
        const $experienceList = $('#experience-list');
        const $experienceInput = $('#experience');

        let val = $experienceInput.val();

        if (val === '')
            val = $experienceInput.attr('placeholder');

        let experienceElement = `<li class="list-group-item">${val}</li>`;

        $experienceList.append(experienceElement);

        $experienceInput.val('');
    });

    $('#reset').on('click', function () {
        const $educationList = $('#education-list');
        const $experienceList = $('#experience-list');

        $educationList.empty();
        $experienceList.empty();
    });
});
