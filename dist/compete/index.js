let password = prompt('Password');

function main () {
    const name = prompt('Name');

    const helpText = document.getElementById('help');

    document.getElementById('name').innerText = name;

    let state = 'ready';

    document.body.onclick = async (event) => {
        // as precise time as possible
        const time = Date.now();

        event.preventDefault();

        if (state !== 'ready') return;

        state = 'pressed';

        await fetch(`../backend/press.php?name=${name}&time=${time}&password=${password}`);
    }

    async function getData () {

        const rawQ = await fetch('../backend/get-q.php');
        const Q = await rawQ.json();

        if (Q.filter(a => a.name === name).length) {
            if (state === 'pressed') {
                state = 'waiting';
            }

            helpText.innerText = 'Please wait, ';
            document.body.classList.add('dark-bg');
        } else {
            if (state === 'waiting') {
                state = 'ready';
            }

            helpText.innerText = 'Tap anywhere, ';
            document.body.classList.remove('dark-bg');
        }

        setTimeout( () => requestAnimationFrame(getData), 500);
    }

    getData();
}

(async () => {
    if (await (await fetch(`../backend/valid-pass.php?password=${password}`)).text() === '1') {
        main();
    } else {
        window.location.assign('../');
    }
})();
