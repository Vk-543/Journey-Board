const jsonData = {
    title: "Technical Project Management",
    tasks: [
        {
            task_id: 1,
            task_title: "Explore the world of management",
            assets: [
                {
                    asset_title: "Technical Project Management",
                    asset_description: "Story of Alignment and Scope of Agility",
                    asset_type: "video",
                    asset_source: "https://example.com/video",
                },
                {
                    asset_title: "Threadbuild",
                    asset_description: "Watch the video and jot key threads",
                    asset_type: "article",
                    asset_source: "",
                },
            ],
        },
    ],
};

const renderTasks = (tasks) => {
    const taskContainer = document.getElementById("task-container");
    tasks.forEach((task) => {
        const taskDiv = document.createElement("div");
        taskDiv.className = "task";
        taskDiv.setAttribute("data-id", task.task_id);

        // Task Title
        const taskTitle = document.createElement("h3");
        taskTitle.textContent = task.task_title;
        taskDiv.appendChild(taskTitle);

        // Assets
        task.assets.forEach((asset) => {
            const assetDiv = document.createElement("div");
            assetDiv.className = "asset";

            // Asset Title and Description
            const assetTitle = document.createElement("p");
            assetTitle.innerHTML = `<strong>${asset.asset_title}</strong>: ${asset.asset_description}`;
            assetDiv.appendChild(assetTitle);

            // Asset Source Link
            if (asset.asset_source) {
                const assetSource = document.createElement("p");
                assetSource.innerHTML = `Source: <a href="${asset.asset_source}" target="_blank" title="${asset.asset_source}">${asset.asset_source}</a>`;
                assetDiv.appendChild(assetSource);
            }

            taskDiv.appendChild(assetDiv);
        });

        // Delete Button
        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "×";
        deleteBtn.addEventListener("click", () => deleteTask(task.task_id));
        taskDiv.appendChild(deleteBtn);

        taskContainer.appendChild(taskDiv);
    });
};

const deleteTask = (taskId) => {
    const taskContainer = document.getElementById("task-container");
    jsonData.tasks = jsonData.tasks.filter((task) => task.task_id !== taskId);
    taskContainer.innerHTML = "";
    renderTasks(jsonData.tasks);
};

document.addEventListener("DOMContentLoaded", () => {
    renderTasks(jsonData.tasks);
});

document.getElementById("add-task").addEventListener("click", () => {
    const newTaskTitle = prompt("Enter task title:");
    if (!newTaskTitle) return;

    const newAssetTitle = prompt("Enter asset title:");
    if (!newAssetTitle) return;

    const newAssetDescription = prompt("Enter asset description:");
    if (!newAssetDescription) return;

    const newAssetType = prompt("Enter asset type (e.g., 'video', 'image', 'article'). Optional, press Cancel to skip:");
    let newAssetSource = "";

    if (newAssetType) {
        newAssetSource = prompt(`Enter the ${newAssetType} source URL. Optional, press Cancel to skip:`);
    }

    const newTask = {
        task_id: jsonData.tasks.length + 1,
        task_title: newTaskTitle,
        assets: [
            {
                asset_title: newAssetTitle,
                asset_description: newAssetDescription,
                asset_type: newAssetType || "N/A",
                asset_source: newAssetSource || "",
            },
        ],
    };

    jsonData.tasks.push(newTask);
    renderTasks([newTask]);
});
