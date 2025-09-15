export default function AssignmentEditor() {
    return (
      <div id="wd-assignments-editor">
        <label htmlFor="wd-name">Assignment Name</label>
        <input id="wd-name" defaultValue="A1 - ENV + HTML" /><br /><br />
  
        <textarea
        id="wd-description"
        rows={8}
        style={{ width: "100%" }}
        defaultValue={`The assignment is available online. Submit a link to the landing page of your Web application running on Netlify. The landing page should include the following: Your full name and section; Links to each of the lab assignments; Link to the Kanbas application; Links to all relevant source code repositories; The Kanbas application should include a link to navigate back to the landing page.`}
        />
        <br />
  
        <table>
          <tbody>
            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-points">Points</label>
              </td>
              <td>
                <input id="wd-points" value={100} />
              </td>
            </tr>
  
            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-group">Assignment Group</label>
              </td>
              <td>
                <select id="wd-group" defaultValue="ASSIGNMENTS">
                  <option value="ASSIGNMENTS">ASSIGNMENTS</option>
                  <option value="QUIZZES">QUIZZES</option>
                  <option value="EXAMS">EXAMS</option>
                  <option value="PROJECT">PROJECT</option>
                </select>
              </td>
            </tr>
  
            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-display-grade-as">Display Grade as</label>
              </td>
              <td>
                <select id="wd-display-grade-as" defaultValue="PERCENTAGE">
                  <option value="PERCENTAGE">Percentage</option>
                  <option value="POINTS">Points</option>
                  <option value="LETTER">Letter Grade</option>
                </select>
              </td>
            </tr>
  
            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-submission-type">Submission Type</label>
              </td>
              <td>
                <select id="wd-submission-type" defaultValue="ONLINE">
                  <option value="ONLINE">Online</option>
                  <option value="ON_PAPER">On Paper</option>
                  <option value="NO_SUBMISSION">No Submission</option>
                </select>
              </td>
            </tr>
  
            <tr>
              <td />
              <td>
                <div>Online Entry Options</div>
                <div>
                  <input type="checkbox" id="wd-text-entry" />{" "}
                  <label htmlFor="wd-text-entry">Text Entry</label><br />
  
                  <input type="checkbox" id="wd-website-url" />{" "}
                  <label htmlFor="wd-website-url">Website URL</label><br />
  
                  <input type="checkbox" id="wd-media-recordings" />{" "}
                  <label htmlFor="wd-media-recordings">Media Recordings</label><br />
  
                  <input type="checkbox" id="wd-student-annotation" />{" "}
                  <label htmlFor="wd-student-annotation">Student Annotation</label><br />
  
                  <input type="checkbox" id="wd-file-upload" />{" "}
                  <label htmlFor="wd-file-upload">File Uploads</label>
                </div>
              </td>
            </tr>
  
            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-assign-to">Assign to</label>
              </td>
              <td>
                <input id="wd-assign-to" defaultValue="Everyone" />
              </td>
            </tr>
  
            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-due-date">Due</label>
              </td>
              <td>
                <input type="date" id="wd-due-date" defaultValue="2024-05-13" />
              </td>
            </tr>
  
            <tr>
              <td align="right" valign="top">
                <label htmlFor="wd-available-from">Available from</label>
              </td>
              <td>
                <input type="date" id="wd-available-from" defaultValue="2024-05-06" />
                &nbsp;&nbsp;
                <label htmlFor="wd-available-until">Until</label>
                &nbsp;
                <input type="date" id="wd-available-until" defaultValue="2024-05-20" />
              </td>
            </tr>
  
            <tr><td colSpan={2}><hr /></td></tr>
  
            <tr>
              <td />
              <td>
                <button type="button">Cancel</button>
                &nbsp;
                <button type="button">Save</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
  