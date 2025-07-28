const ProgressBar = function ({ progress }) {
  return React.createElement(
    "div",
    { className: "progress-bar" },
    React.createElement("div", {
      className: "progress-bar-inner",
      style: { width: progress + "%" },
    })
  );
};

const MatchResultTable = function ({ matches }) {
  const rows =
    matches.length > 0
      ? matches.map(function (p) {
          return React.createElement(
            "tr",
            { key: p.id },
            React.createElement("td", null, p.name),
            React.createElement("td", null, (p.score * 100).toFixed(1) + "%")
          );
        })
      : [
          React.createElement(
            "tr",
            { key: "no-match" },
            React.createElement(
              "td",
              { colSpan: 2, align: "center" },
              "No suitable matches found."
            )
          ),
        ];

  return React.createElement(
    "table",
    { border: "1", cellPadding: "8", cellSpacing: "0", width: "100%" },
    React.createElement(
      "thead",
      null,
      React.createElement(
        "tr",
        null,
        React.createElement("th", null, "Consultant Name"),
        React.createElement("th", null, "Match Score")
      )
    ),
    React.createElement("tbody", null, rows)
  );
};

const ARDashboard = function () {
  const status = "In Progress";
  const topMatches = [
    { id: 1, name: "Alice Singh", score: 0.93 },
    { id: 2, name: "Bob Das", score: 0.89 },
    { id: 3, name: "Carol Roy", score: 0.85 },
  ];
  return React.createElement(
    "div",
    null,
    React.createElement("h2", null, "JD Comparison Status: " + status),
    React.createElement(ProgressBar, {
      progress: status === "Completed" ? 100 : 65,
    }),
    React.createElement("h3", null, "Top 3 Matches"),
    React.createElement(MatchResultTable, { matches: topMatches }),
    React.createElement("h4", null, "Email Status: Sent")
  );
};

const ARJDStatus = function () {
  const matches = [
    { id: 1, name: "Alice Singh", score: 0.92 },
    { id: 2, name: "Bob Das", score: 0.87 },
    { id: 3, name: "Carol Roy", score: 0.81 },
  ];

  return React.createElement(
    "div",
    null,
    React.createElement("h2", null, "JD Detailed Status"),
    React.createElement(
      "p",
      null,
      "Progress bar, match results per profile, and candidate details go here."
    ),
    React.createElement(ProgressBar, { progress: 80 }),
    React.createElement(MatchResultTable, { matches: matches })
  );
};

const RecruiterConsole = function () {
  return React.createElement(
    "div",
    null,
    React.createElement("h2", null, "Recruiter Admin Console"),
    React.createElement(
      "ul",
      null,
      React.createElement("li", null, "Monitor agent queues (stub)"),
      React.createElement("li", null, "Error rates, latency, system health")
    )
  );
};

const RecruiterJDSearch = function () {
  return React.createElement(
    "div",
    null,
    React.createElement("h2", null, "JD Search"),
    React.createElement(
      "p",
      null,
      "Filter JDs by skill, experience, status (example only)."
    )
  );
};

const RecruiterReport = function () {
  return React.createElement(
    "div",
    null,
    React.createElement("h2", null, "Report Generator"),
    React.createElement(
      "p",
      null,
      "Export match reports by JD or consultant (stub)."
    )
  );
};

const NotFound = function () {
  return React.createElement("h2", null, "Page Not Found");
};

function App() {
  const [role, setRole] = React.useState("ar");
  const [page, setPage] = React.useState("dashboard");

  return React.createElement(
    "div",
    { className: "container" },
    React.createElement(
      "header",
      null,
      React.createElement("h1", null, "Recruitment Matcher"),
      React.createElement(
        "select",
        {
          value: role,
          onChange: function (e) {
            setRole(e.target.value);
            setPage("dashboard");
          },
        },
        React.createElement("option", { value: "ar" }, "AR Requestor"),
        React.createElement("option", { value: "recruiter" }, "Recruiter")
      )
    ),
    React.createElement(
      "nav",
      null,
      role === "ar"
        ? [
            React.createElement(
              "button",
              { key: "dash", onClick: () => setPage("dashboard") },
              "Dashboard"
            ),
            React.createElement(
              "button",
              { key: "jdstatus", onClick: () => setPage("jdstatus") },
              "JD Status"
            ),
          ]
        : [
            React.createElement(
              "button",
              { key: "admin", onClick: () => setPage("dashboard") },
              "Admin Console"
            ),
            React.createElement(
              "button",
              { key: "search", onClick: () => setPage("jdsearch") },
              "JD Search"
            ),
            React.createElement(
              "button",
              { key: "report", onClick: () => setPage("report") },
              "Reports"
            ),
          ]
    ),
    React.createElement(
      "main",
      null,
      role === "ar" && page === "dashboard"
        ? React.createElement(ARDashboard)
        : role === "ar" && page === "jdstatus"
        ? React.createElement(ARJDStatus)
        : role === "recruiter" && page === "dashboard"
        ? React.createElement(RecruiterConsole)
        : role === "recruiter" && page === "jdsearch"
        ? React.createElement(RecruiterJDSearch)
        : role === "recruiter" && page === "report"
        ? React.createElement(RecruiterReport)
        : React.createElement(NotFound)
    ),
    React.createElement(
      "footer",
      null,
      "\u00A9 ",
      new Date().getFullYear(),
      " Rankitech Recruitment Matcher"
    )
  );
}

// Mount to DOM
ReactDOM.render(React.createElement(App), document.getElementById("root"));
