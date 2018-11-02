$(function () {
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

    $('#button-skills').on('click', function () {
        const $skillTable = $('table.table');
        const $skillTableBody = $skillTable.find('tbody');

        let skillTitle = $('#title').val();
        let skillContent = $('#content').val();

        if (skillTitle === '')
            skillTitle = $('#title').attr('placeholder');

        if (skillContent === '')
            skillContent = $('#content').attr('placeholder');

        let skillElement = `
            <tr>
                <td>${skillTitle}</td>
                <td>${skillContent}</td>
            </tr>
        `;

        $skillTableBody.append(skillElement);

        $('#title').val('');
        $('#content').val('');
    });

    $('#reset').on('click', function () {
        const $educationList = $('#education-list');
        const $experienceList = $('#experience-list');

        const $skillTable = $('table.table');
        const $skillTableBody = $skillTable.find('tbody');

        $educationList.empty();
        $experienceList.empty();
        $skillTableBody.empty();
    });

    $('#submit').on('click', function () {
        $('#modal-filename').modal('show');
    });

    $('#save').on('click', function () {
        const $fileInput = $('#filename');

        let filename = $fileInput.val();

        if(filename === '') {
            alert('파일 이름을 입력해주세요.');
            return false;
        }

        const resume = makeResume();
        saveResume(resume, filename);

        $fileInput.val('');
        $('#modal-filename').modal('hide');
    });

    function makeResume() {
        const firstName = $('#firstName').val();
        const lastName = $('#lastName').val();

        const telephone = $('#telephone').val();
        const careerGoal = $('#careerGoal').val();

        const $educationList = $('#education-list');
        const $experienceList = $('#experience-list');

        const $skillTable = $('tbody');

        let educationListElements = '';
        let experienceListElements = '';
        let skillListElements = '';

        $.each($educationList.find('li'), function() {
            educationListElements += '<li>' + $(this).text() + '</li>';
        });

        $.each($experienceList.find('li'), function() {
            experienceListElements += '<li>' + $(this).text() + '</li>';
        });

        $.each($skillTable.find('tr'), function() {
            skillListElements += '<li>Title : ' + $(this).children('td').eq(0).text() + ', Content : ' + $(this).children('td').eq(1).text() + '</li>';
        });

        let resume = `
            <!DOCTYPE html>
            <html lang="en">
                <head>
                    <meta charset="UTF-8">
                
                    <title>Resume</title>
                
                    <!-- Bootstrap 4.0-->
                    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
                          integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
                
                    <!-- Bootstrap-extend -->
                    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js"
                            integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo"
                            crossorigin="anonymous"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js"
                            integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49"
                            crossorigin="anonymous"></script>
                    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js"
                            integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy"
                            crossorigin="anonymous"></script>
                
                    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
                </head>
                <body style="margin: 5rem 20rem">
                    <h1 class="text-center">Resume</h1>
                    <hr>
                    <div>
                        <h6>Last Name</h6>
                        <span>${lastName}</span>
                    </div>
        
                    <div>
                        <h6>First Name</h6>
                        <span>${firstName}</span>
                    </div>

                    <div>
                        <h6>Telephone</h6>
                        <span>${telephone}</span>
                    </div>

                    <div>
                        <h6>Career Goal</h6>
                        <span>${careerGoal}</span>
                    </div>

                    <div>
                        <h6>Experience</h6>
                        <ul>
                            ${experienceListElements}
                        </ul>
                    </div>

                    <div>
                        <h6>Education</h6>
                        <ul>
                            ${educationListElements}
                        </ul>
                    </div>
                    
                    <div>
                        <h6>Skills</h6>
                        <ul>
                            ${skillListElements}
                        </ul>
                    </div>
                </body>
            </html>
        `;

        return resume;
    }

    function saveResume(resume, filename) {
        let link = `data:text/html,${resume}`;
        let downlink = `<a href='${link}' id="link" download="${filename}.html">download</a>`;

        $('body').append(downlink);
        $('#link')[0].click();
        $('#link').remove();
    }
});
