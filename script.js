// 你的项目列表
const projects = [
  { title: "Coalgebraic Logic Research", link: "#" },
  { title: "Python Logic Experiments", link: "#" },
  { title: "GitHub Pages Academic Homepage", link: "#" }
];

// 你的论文列表
const papers = [
  { title: "Non-Distributive Modal Logic", link: "#" },
  { title: "Polarity-Based Semantics", link: "#" }
];

// 渲染项目
const projectList = document.getElementById('project-list');
projects.forEach(p => {
  const li = document.createElement('li');
  li.innerHTML = `<a href="${p.link}" target="_blank">${p.title}</a>`;
  projectList.appendChild(li);
});

// 渲染论文
const paperList = document.getElementById('paper-list');
papers.forEach(p => {
  const li = document.createElement('li');
  li.innerHTML = `<a href="${p.link}" target="_blank">${p.title}</a>`;
  paperList.appendChild(li);
});
