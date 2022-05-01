function main () {
    const name = prompt('Name');

    document.getElementById('name').innerText = name;

    document.body.onclick = async (e) => {

        const time = Date.now();

        e.preventDefault();

        await fetch(`backend/press.php?name=${name}&time=${time}`);
    }
}

if (prompt('Password') === '123') {
    main();
}