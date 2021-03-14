const settings = require("../source/scripts/script");

describe("checkSettings tests", () => {
    test("Seeing whether localStorage values are non-null", () => {
        settings.checkSettings();
        expect(window.localStorage.getItem("workPomoTime")).not.toBeNull();
        expect(window.localStorage.getItem("shortBreakTime")).not.toBeNull();
        expect(window.localStorage.getItem("longBreakTime")).not.toBeNull();
        expect(window.localStorage.getItem("analyticsToggle")).not.toBeNull();
        expect(window.localStorage.getItem("darkModeToggle")).not.toBeNull();
    });
});

describe("submitSettings tests", () => {
    test("Checking whether DOM elements are the same as localStorage", () => {
        settings.submitSettings();
        expect(window.localStorage.getItem("workPomoTime")).toBe(document.getElementById("work-pomo-time").value);
        expect(window.localStorage.getItem("shortBreakTime")).toBe(document.getElementById("short-break-time").value);
        expect(window.localStorage.getItem("longBreakTime")).toBe(document.getElementById("long-break-time").value);
    });
});

describe("resetSettings tests", () => {
    test("Checking whether default values have been reset", () => {
        settings.resetSettings();
        expect(window.localStorage.getItem("workPomoTime")).toBe("25");
        expect(window.localStorage.getItem("shortBreakTime")).toBe("5");
        expect(window.localStorage.getItem("longBreakTime")).toBe("15");
        expect(window.localStorage.getItem("analyticsToggle")).toBe("1");
        expect(window.localStorage.getItem("darkModeToggle")).toBe("0");
    });
});

/* document.body.innerHTML = `
<div id="mySidebar" class="sidebar">
<button id="timerbtn" onclick="closeNav()">Timer</button>
<button id="tasksbtn" onclick="openTasks()">Task List</button>
<button id="analyticsbtn" onclick="openAnalytics()">Analytics</button>
<button id="settingsbtn" onclick="openSettings()">Settings</button>
</div>

<span id="openButton" onclick="openNav()"> &#9776; </span>
<!--Timer Screen-->
<div id="display">
<div id="timer" class="content">
  <div id='curr-task'></div>
  <div id='pomo-status'>Work Pomo</div>
  <div id="countdown">
    <div class="title"> Pomodoro Timer </div>
    <svg id="circle_svg">
      <text id="countdown-number" x="50%" y="50%" dominant-baseline="middle" text-anchor="middle">
        0
      </text>
      <circle cx="50%" cy="50%" r="100" class="animate" />
    </svg>
  </div>
  <br>
  <div id="toggle-div">
    <button id="toggle">START</button>
    <button id="end-task" style="display:none;" onclick="endTask()">TASK FINISHED</button>
    <button id="log-distraction" style="display:none;" onclick="logDistraction()">LOG DISTRACTION</button>
  </div>
</div>
<!--Tasks Screen-->
<div id="tasks" class="content">
  <div class="task-inputs">
    <label class="task-input-field" for="input-task-name">Enter task:</label>
    <input type="text" class="task-input-field" id="input-task-name" />
    <label for="input-pomos" class="task-input-field">Enter number of pomos:</label>
    <input type="number" class="task-input-field" value="10" id="input-pomos" min="1" step="1"
      oninput="validity.valid||(value='');" />
    <button class="task-input-field" id="add-task-button">
      Add Task
    </button>
  </div>
<br><br>

  <div style="display: flex; justify-content: space-evenly; align-items: center; width: 960px; margin: auto; text-align: center; padding:20px; margin-bottom: -30px;">
    <div style="flex-basis: 50%; display: block;">Your Tasks</div> 
    <div style="flex-basis: 10%;">Estimated Pomos</div>
    <div style="flex-basis: 10%;">Actual Pomos</div>
    <div style="flex-basis: 30%;">Control</div>
  </div>
  
<div id="task-list-id" class="task-list"></div>
<br><br>
  <h2 style="text-align: center;">Completed Tasks</h2> 
  <div id="completed-tasks" class="task-list"></div>
</div>


<!--Settings Screen-->
<div id="settings" class="content">
  <table id="settings-table">
    <tr>
      <td>
        <label for="work-pomo-time">Work Pomo Length (in minutes): &nbsp</label>
      </td>
      <td>
        <input type="number" value="25" id="work-pomo-time">
      </td>
    </tr>
    <tr>
      <td>
        <label for="short-break-time">Short Break Length (in minutes): &nbsp</label>
      </td>
      <td>
        <input type="number" value="5" id="short-break-time">
      </td>
    </tr>
    <tr>
      <td>
        <label for="long-break-time">Long Break Length (in minutes): &nbsp</label>
      </td>
      <td>
        <input type="number" value="15" id="long-break-time">
      </td>
    </tr>
    <tr>
      <td>
        Toggle Analytics
      </td>
      <td>
        <label class="switch">
          <input type="checkbox" id="analytics-checkbox" checked>
          <span class="slider round"></span>
        </label>

        <!-- 
        <label for="analytics-on">On</label>
        <input type="radio" name="analytics-toggle" id="analytics-on" value="On" checked>
        <label for="analytics-off">Off</label>
        <input type="radio" name="analytics-toggle" id="analytics-off" value="Off">
        -->
      </td>
    </tr>
    <tr>
      <td>
        Toggle Dark Mode
      </td>
      <td>
        <label class="switch">
          <input type="checkbox" id="dark-mode" checked>
          <span class="slider round"></span>
        </label>
        <!-- 
        <label for="dark-mode-on">On</label>
        <input type="radio" name="dark-mode-toggle" id="dark-mode-on" value="On">
        <label for="dark-mode-off">Off</label>
        <input type="radio" name="dark-mode-toggle" id="dark-mode-off" value="Off" checked>
        -->
      </td>
    </tr>
  </table>
  <br>
  <button id="submit-button" onclick="submitSettings()">Submit</button>
  <button id="reset-button" onclick="resetSettings()">Reset to Defaults</button>
  <br><br><br>
</div>
<!--Analytics Screen-->
<div id="analytics" class="content">
  <div id="task-select">
    <h2>Select Analytics For: </h2>
    <br>
    <select name="comp-tasks-dropdown" id="comp-tasks-dropdown">
    </select>
    <br><br>
    <div id="stat-display"></div>
  </div>

  <h1 id="no-tasks" style="text-align: center;">Complete A Task To View Analytics!</h1>
</div>

<!--Audio Sounds for Timer-->
<audio id="chirp-sound" src="../media/audio/chirp.WAV"></audio>
<audio id="alert-sound" src="../media/audio/alert.WAV"></audio>
</div>
`; */