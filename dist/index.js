const name = window.location.href.split('?')[1];

console.log('loaded');

document.getElementById('name').innerText = name;

document.body.onclick = async (e) => {
    e.preventDefault();

    console.log('Press!');

    await fetch('backend/press.php?name=' + name);
}