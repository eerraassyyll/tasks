let projects = JSON.parse(localStorage.getItem('projects')) || [];
let eid=null;

let form = document.getElementById('form');
let tbody = document.getElementById('tbody');
let statss = document.getElementById('stats');

function saveData() {
    localStorage.setItem('projects', JSON.stringify(projects));
}

function render() {
    let searchTerm = document.getElementById('searchInput').value.toLowerCase();
    let filterStatus = document.getElementById('filterStatus').value;
    let sortValue = document.getElementById('sortValue').value;

    let filtered = projects.filter(p => {
        let matchesSearch = p.title.toLowerCase().includes(searchTerm);
        let matchesStatus = filterStatus === 'all' || p.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    if (sortValue === 'asc') {
        filtered.sort((a, b) => a.value - b.value);
    } else if (sortValue === 'desc') {
        filtered.sort((a, b) => b.value - a.value);
    }

    tbody.innerHTML = '';

    filtered.forEach((k, index) => {
        let row = `
            <tr>
                <td>${index + 1}</td>
                <td>${k.title}</td>
                <td>${k.category}</td>
                <td>${k.value}%</td>
                <td>${k.status}</td>
                <td>
                    <button onclick="editProj(${k.id})">EDIT</button>
                    <button onclick="delProj(${k.id})">DEL</button>
                </td>
            </tr>
        `;
        tbody.insertAdjacentHTML('beforeend', row);
    });

    update();
}

function update() {
    let total = projects.length;
    let avg = total > 0 ? (projects.reduce((sum, p) => sum + Number(p.value), 0) / total).toFixed(1) : 0;
    let activeCount = projects.filter(p => p.status === 'active').length;
    let doneCount = projects.filter(p => p.status === 'done').length;
    let archCount = projects.filter(p => p.status === 'archived').length;

    statss.innerHTML = `
        <b>Всего:</b> ${total} / 
        <b>Средняя готовность:</b> ${avg}% / 
        <b>Active:</b> ${activeCount} / 
        <b>Done:</b> ${doneCount} / 
        <b>Archived:</b> ${archCount}
    `;
}


form.addEventListener('submit', (e) => {
    e.preventDefault();

    let title = document.getElementById('title').value;
    let category = document.getElementById('category').value;
    let value = document.getElementById('value').value;
    let status = document.getElementById('status').value;

    if (eid) {
        let index = projects.findIndex(p => p.id === eid);
        projects[index] = { ...projects[index], title, category, value, status };
        eid = null;
        document.getElementById('submitBtn').innerText = 'Сохранить';
    } else {
        let newProject = {
            id: Date.now(),
            title,
            category,
            value,
            status
        };
        projects.push(newProject);
    }

    saveData();
    form.reset();
    render();
});

function delProj(id) {
    if (confirm('Удалить проект?')) {
        projects = projects.filter(p => p.id !== id);
        saveData();
        render();
    }
}

function editProj(id) {
    let project = projects.find(p => p.id === id);
    if (project) {
        document.getElementById('title').value = project.title;
        document.getElementById('category').value = project.category;
        document.getElementById('value').value = project.value;
        document.getElementById('status').value = project.status;
        
        eid = id;
        document.getElementById('submitBtn').innerText = 'Обновить';
    }
}

document.getElementById('resetBtn').addEventListener('click', () => {
    eid = null;
    form.reset();
    document.getElementById('submitBtn').innerText = 'Сохранить';
});

document.getElementById('searchInput').addEventListener('input', render);
document.getElementById('filterStatus').addEventListener('change', render);
document.getElementById('sortValue').addEventListener('change', render);

render();
