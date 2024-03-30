const sideListCls = new GenerateSideNav();
const sideList = sideListCls.create("mainMenu", "Journal Management");
const mobilesideList = sideListCls.createMobileNav();
$(".MobileSideNavBarContainer").html(mobilesideList);
$("#sidebarnav").html(sideList);

$(() => {
  getAllJournals();
  ckEditorEmbark();
});

var JournalsList;

function getAllJournals() {
  $("#search").val("");
  const url = "/journalmanagement/App/controllers/Journal/getAllJournals";
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  fetch(url, requestOptions)
    .then((response) => response.json())
    .then(async (data) => {
      if (data && data.status && data.data && data.data.length) {
        let Journals = data.data;
        JournalsList = data.data;
        console.log(Journals);
        let journalelem = "";
        if (Journals && Journals.length) {
          Journals.forEach((journal) => {
            const { JournalName, MainCategory, ISSNNumber, ImpactFactorValue } =
              journal;
            journalelem += `<tr>
                                <td class="ps-0">
                                    <div class="d-flex align-items-center">
                                        <div>
                                            <h6 class="fw-semibold mb-1">${JournalName}</h6>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <p class="mb-0 fs-3">${MainCategory}</p>
                                </td>
                                <td>
                                    <p class="mb-0 fs-3">${ISSNNumber}</p>
                                </td>
                                <td>
                                    <p class="mb-0 fs-3">${ImpactFactorValue}</p>
                                </td>
                                <td>
                                    <span style="cursor: pointer;" class="badge fw-semibold p-2 bg-light-primary text-primary" onclick="showJournalModalPopup('${journal._id}')"><i class="fa-solid fa-pen-to-square"></i> Modify</span>
                                </td>
                            </tr>`;
          });
          $("#journalcontaierID").html(journalelem);
        }
      }
    });
}

let sourceID1 = "aboutJournalID";
let labelText1 = "About Journal" + `<span class="text-danger">*<span>`;
var aboutjournal;
var textareaElement1;
function ckEditorEmbark() {
  aboutjournal = new GenerateCkEditor();
  textareaElement1 = aboutjournal.create(sourceID1, labelText1);
  $("#aboutJournalContainer").html(textareaElement1);
  aboutjournal.initEditor(sourceID1);
}

function showJournalModalPopup(journalID) {
  if (JournalsList && JournalsList.length && journalID) {
    let selectedjournal = JournalsList.find((x) => x._id == journalID);
    if (selectedjournal) {
      $("#JournalModalID").modal("show");
      const {
        JournalName,
        MainCategory,
        ISSNNumber,
        ImpactFactorValue,
        About,
        NLMCode,
        JournalSlug,
        isActive
      } = selectedjournal;
      $("#journalTitle").val(JournalName);
      $("#MainCategoryID").val(MainCategory);
      $("#issnNumber").val(ISSNNumber);
      $("#ImpactFactorValueID").val(ImpactFactorValue);
      $("#NLMCodeID").val(NLMCode);
      $("#JournalSlugID").val(JournalSlug);
      $("#isJournalActiveID").prop("checked", isActive);
      aboutjournal.setValue(sourceID1, About);
      $("#modifyEditorID").attr("editorid", selectedjournal._id);
    }
  }
}

function saveData() {
  let JournalID = $("#modifyEditorID").attr("editorid");
  if (JournalID && JournalID !== "") {
    let about = aboutjournal.getData(sourceID1);
    let ISSN = document.getElementById("issnNumber").value;
    let MainCategory = document.getElementById("MainCategoryID").value;
    let isActive = $("#isJournalActiveID").prop("checked");
    let ImpactFactorValue = document.getElementById(
      "ImpactFactorValueID"
    ).value;
    let NLMCode = document.getElementById("NLMCodeID").value;

    if (ISSN == null || ISSN == "") {
      console.log("Enter ISSN!");
      $(".validationalert").removeClass("d-none");
      $(".validationalert").text("Enter Journal ISSN!");
      return;
    } else if (about == null || about == "") {
      console.log("Enter about!");
      $(".validationalert").removeClass("d-none");
      $(".validationalert").text("Enter About Journal!");
      return;
    } else if (MainCategory == null || MainCategory == "") {
      console.log("Enter MainCategory!");
      $(".validationalert").removeClass("d-none");
      $(".validationalert").text("Enter Journal Main Category!");
      return;
    } else if (ImpactFactorValue == null || ImpactFactorValue == "") {
      console.log("Enter ImpactFactorValue!");
      $(".validationalert").removeClass("d-none");
      $(".validationalert").text("Enter Journal Impact Factor Value!");
      return;
    } else if (NLMCode == null || NLMCode == "") {
      console.log("Enter NLMCode!");
      $(".validationalert").removeClass("d-none");
      $(".validationalert").text("Enter Journal NLM Code!");
      return;
    } else {
      $(".validationalert").addClass("d-none");
      const url = "/journalmanagement/App/controllers/Journal/updateJournal";

      let data = {
        ISSNNumber: ISSN,
        About: about,
        MainCategory: MainCategory,
        ImpactFactorValue: Number(ImpactFactorValue),
        NLMCode: NLMCode,
        journalId: JournalID,
        isActive: isActive
      };

      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      };
      console.log(requestOptions);

      fetch(url, requestOptions)
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Failed to add journal");
          }
        })
        .then((data) => {
          $(".validationalert").removeClass("d-none alert-danger");
          $(".validationalert").text("Journal Updated successfully!");
          $(".validationalert").addClass("alert-success");
          document.getElementById("journalTitle").value = "";
          document.getElementById("issnNumber").value = "";
          aboutjournal.setValue(sourceID1, "");
          document.getElementById("MainCategoryID").value = "";
          document.getElementById("ImpactFactorValueID").value = "";
          document.getElementById("NLMCodeID").value = "";
          document.getElementById("JournalSlugID").value = "";
          setTimeout(() => {
            $(".validationalert").removeClass("alert-success");
            $(".validationalert").addClass("d-none alert-danger");
            $("#JournalModalID").modal("hide");
          }, 1000);
          getAllJournals();
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  }
}

function searchData() {
  let title = $("#search").val();
  $(".loader").removeClass("d-none");
  if (title != null && title != "") {
    let data = {
      JournalName: title,
    };
    fetch("/journalmanagement/App/controllers/Journal/searchJournal", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        $(".loader").addClass("d-none");
        if (data && data.status && data.data && data.data.length) {
          let Journals = data.data;
          JournalsList = data.data;
          console.log(Journals);
          let journalelem = "";
          if (Journals && Journals.length) {
            Journals.forEach((journal) => {
              const {
                JournalName,
                MainCategory,
                ISSNNumber,
                ImpactFactorValue,
              } = journal;
              journalelem += `<tr>
                                    <td class="ps-0">
                                        <div class="d-flex align-items-center">
                                            <div>
                                                <h6 class="fw-semibold mb-1">${JournalName}</h6>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        <p class="mb-0 fs-3">${MainCategory}</p>
                                    </td>
                                    <td>
                                        <p class="mb-0 fs-3">${ISSNNumber}</p>
                                    </td>
                                    <td>
                                        <p class="mb-0 fs-3">${ImpactFactorValue}</p>
                                    </td>
                                    <td>
                                        <span style="cursor: pointer;" class="badge fw-semibold p-2 bg-light-primary text-primary" onclick="showJournalModalPopup('${journal._id}')"><i class="fa-solid fa-pen-to-square"></i> Modify</span>
                                    </td>
                                </tr>`;
            });
            $("#journalcontaierID").html(journalelem);
          }
        }
      });
  } else {
    getAllJournals();
    $(".loader").addClass("d-none");
  }
}
