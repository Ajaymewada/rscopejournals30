document.title = "Artical Types";
const sideListCls = new GenerateSideNav();
const sideList = sideListCls.create("usefullLinks", "Artical Types");
const mobilesideList = sideListCls.createMobileNav();
$(".MobileSideNavBarContainer").html(mobilesideList);
$("#sidebarnav").html(sideList);


// Usage
let sourceID1 = "ForReviewersID"
let labelText1 = "For Articals" + `<span class="text-danger">*<span>`
let sourceID2 = "descriptionID"
let labelText2 = "Meta Description" + `<span class="text-danger">*<span>`

var forreviewer;
var description;
function ckEditorInitiator() {
    forreviewer = new GenerateCkEditor();
    description = new GenerateCkEditor();

    const textareaElement1 = forreviewer.create(sourceID1, labelText1);
    const textareaElement2 = description.create(sourceID2, labelText2);

    $("#forauthorArea").html(textareaElement1);
    $("#descriptionArea").html(textareaElement2);

    // Initialize CKEditor on the created textarea
    forreviewer.initEditor(sourceID1);
    description.initEditor(sourceID2);
}

$('#TagsID').tagEditor({
    delimiter: '', /* space and comma */
    forceLowercase: false,
});
$(() => {
    getData();
})
function getData() {
    const url = '/getFirstReviewerDocument';
    const requestOptions = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    fetch(url, requestOptions)
        .then(response => response.json())
        .then(async data => {
            console.log(data)
            if (data && data !== null) {
                await ckEditorInitiator();
                const { keywords, name, metatitle} = data;
                if(metatitle) {
                    $("#metaTitleID").val(metatitle);
                }
                // document.title = title || "For Reviewers";
                forreviewer.setValue(sourceID1, name || "");
                description.setValue(sourceID2, data.description || "");
                if (keywords && Array.isArray(keywords) && keywords.length) {
                    $('#TagsID').tagEditor('destroy');
                    $('#TagsID').tagEditor({
                        delimiter: '', /* space and comma */
                        forceLowercase: false,
                        initialTags: keywords
                    });
                }
            } else {
                await ckEditorInitiator();
            }
        })
}

function saveData() {
    // Create an object with the data you want to send in the request body
    let name = forreviewer.getData(sourceID1);
    let description1 = description.getData(sourceID2);
    let keywords = $('#TagsID').tagEditor('getTags')[0].tags;
    let metatitle = $("#metaTitleID").val();
    if (name == null || name == "") {
        $(".validationalert").removeClass('d-none')
        $(".validationalert").text("Enter For Editors");
        return;
    } else if (description1 == null || description1 == "") {
        console.log("Enter description");
        $(".validationalert").removeClass('d-none')
        $(".validationalert").text("Enter Description");
        return;
    } else if (keywords == null || keywords.length == 0) {
        console.log("Enter Keywords");
        $(".validationalert").removeClass('d-none')
        $(".validationalert").text("Enter Keywords");
        return;
    } else if (metatitle == null || metatitle == ""){
        $(".validationalert").removeClass('d-none')
        $(".validationalert").text("Enter Keywords");
        return;
    }  else {
        $(".validationalert").addClass('d-none');
        console.log(name, description1, keywords)
        const data = {
            name: name,
            description: description1,
            keywords: keywords,
            metatitle
        };
        fetch('/saveOrUpdateFirstReviewerDocument', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Failed to add for Reviewers!');
                }
            })
            .then(data => {
                // Handle the response data here (e.g., show a success message)
                $(".validationalert").removeClass('d-none alert-danger')
                $(".validationalert").text("For Artical Types added successfully!");
                $(".validationalert").addClass('alert-success');
                setTimeout(() => {
                    $(".validationalert").removeClass('alert-success');
                    $(".validationalert").addClass('d-none alert-danger');
                }, 3000);
                console.log('For Artical Types added successfully', data);
            })
            .catch(error => {
                // Handle any errors that occurred during the fetch
                console.error('Error adding For Reviewers:', error);
            });
    }
}
