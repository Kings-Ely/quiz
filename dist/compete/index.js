let password = prompt('Password');

function main () {
    const name = prompt('Name');

    const helpText = document.getElementById('help');

    document.getElementById('name').innerText = name;

    document.body.onclick = async (event) => {
        // as precise time as possible
        const time = Date.now();

        event.preventDefault();

        await fetch(`../backend/press.php?name=${name}&time=${time}&password=${password}`);
    }

    async function getData () {

        const rawQ = await fetch('../backend/get-q.php');
        const Q = await rawQ.json();

        if (Q.filter(a => a.name === name).length) {
            helpText.innerText = 'Wait, ';
            document.body.classList.add('dark-bg');
        } else {
            helpText.innerText = 'Tap anywhere, ';
            document.body.classList.remove('dark-bg');
        }

        setTimeout( () => requestAnimationFrame(getData), 500);
    }

    getData();
}


if (password === '123') {
    main();
} else {
    window.location.assign('../');
}