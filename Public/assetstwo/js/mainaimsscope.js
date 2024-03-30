// var JournalData = JSON.parse(localStorage.getItem("JournalInfo"))

// setTimeout(() => {
//   getJournalById();
// }, 1000);

// function getJournalById() {
//   if (JournalData && JournalData._id) {
//       const url = `/journalmanagement/App/controllers/Journal/${JournalData._id}`;
//       const requestOptions = {
//           method: 'GET',
//           headers: {
//               'Content-Type': 'application/json'
//           }
//       };
//       fetch(url, requestOptions)
//           .then(response => response.json())
//           .then(data => {
//               $(".loader-container").hide();
//               if (data && data.status) {
//                   const { journal } = data;
//                   localStorage.setItem("JournalInfo", JSON.stringify(journal));
//                   // document.getElementById("coverBannerImgID").src = journal.CoverBanner.path;
//                   $("#ISSNNOID").text(journal.ISSNNumber || "NA");
//                   $("#journaltitlecontainerID").text(journal.JournalName);
//                   $("#JournalDesc").html(journal.About);
//                   console.log(journal);
//               }
//           })
//   }
// }

// // $(() => {
// //     getData();
// // });

// // function getData() {
// //     const url = '/getaims-and-scope';
// //     const requestOptions = {
// //         method: 'GET',
// //         headers: {
// //             'Content-Type': 'application/json'
// //         }
// //     };
// //     fetch(url, requestOptions)
// //         .then(response => response.json())
// //         .then(data => {
// //             console.log(data)
// //             if (data && data.status === true) {
// //                 const { aimsandscope, description, keywords, metatitle} = data.data;
// //                 if(metatitle) {
// //                     document.title = metatitle;
// //                 }
// //                 if(description) {
// //                     document.getElementsByTagName('meta')["description"].content = description;
// //                 }
// //                 if(keywords && keywords.length) {
// //                     document.getElementsByTagName('meta')["keywords"].content = keywords.join(",");
// //                 }
// //                 $("#aims_and_scopeContainer").html(aimsandscope || "");

// //                 // Add the shadow class to apply the styling
// //                 $("#aims_and_scopeContainer").addClass('background');
// //             }
// //         });
// // }

// // $(document).ready(function () {
// //     getData2();
// //     getCoverbanner();
// // });

// // function getData2() {
// //     const url = '/getjournal';

// //     const requestOptions = {
// //         method: 'GET',
// //         headers: {
// //             'Content-Type': 'application/json'
// //         }
// //     };
// //     fetch(url, requestOptions)
// //         .then(response => response.json())
// //         .then(data => {
// //             if (data && data.status === true) {
// //                 const { about, issn, name } = data.data;
// //                 $("#journaltitlecontainerID span").text(name || "");
// //                 $("#journaltitlecontainerID h4").text(issn || "");
// //             }
// //         });
// // }

// // function getCoverbanner() {
// //     const url = '/getcoverbanner';

// //     const requestOptions = {
// //         method: 'GET',
// //         headers: {
// //             'Content-Type': 'application/json'
// //         }
// //     };
// //     fetch(url, requestOptions)
// //         .then(response => response.json())
// //         .then(data => {
// //             console.log(data)
// //             if (data && data.status === true) {
// //                 console.log(data);
// //                 $("#coverBannerImgID").attr('src', data.data.path);

// //                 // Add the shadow class to apply the styling
// //                 $("#coverBannerImgID").addClass('shadow');
// //             }
// //         });
// // }

var JournalData = document.getElementById("JournalDataElm").innerHTML;
JournalData = JSON.parse(JournalData);
console.log(JournalData);

setTimeout(() => {
  getJournalById();
}, 1000);

$(() => {
  getAimsAndScopeByJournalId();
});

function getJournalById() {
  if (JournalData) {
    const url = `/journalmanagement/App/controllers/Journal/${JournalData}`;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        $(".loader-container").hide();
        if (data && data.status) {
          const { journal } = data;
          localStorage.setItem("JournalInfo", JSON.stringify(journal));
          // document.getElementById("coverBannerImgID").src = journal.CoverBanner.path;
          $("#ISSNNOID").text(journal.ISSNNumber || "NA");
          $("#journaltitlecontainerID").text(journal.JournalName);
          $("#JournalDesc").html(journal.About);
          console.log(journal);
        }
      });
  }
}

function getAimsAndScopeByJournalId() {
  let JournalDetails = JSON.parse(localStorage.getItem("JournalInfo"));
  if (JournalDetails && JournalDetails._id) {
    const url = `/getaimsscopebyjournalid/${JournalDetails._id}`;
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(url, requestOptions)
      .then((response) => response.json())
      .then(async (data) => {
        if (data && data.status) {
          const { aimsandscope, keywords, metatitle } = data.data[0];
          // $("#aimsAndScopeTitle").text(metatitle);
          document.title = metatitle;
          document
            .querySelector('meta[name="description"]')
            .setAttribute("content", data.data[0].description);

          $("#aimandscopeDesc").html(aimsandscope);
          if (keywords && Array.isArray(keywords) && keywords.length) {
            document
              .querySelector('meta[name="keywords"]')
              .setAttribute("content", keywords.join(','));
          }
        }
      });
  }
}
