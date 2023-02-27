let password = prompt('Compete Password');

function main () {
    const name = prompt('Name');

    const helpText = document.getElementById('help');

    document.getElementById('name').innerText = name;

    /** @type {'ready' | 'pressed' | 'waiting'} */
    let state = 'ready';

    document.body.onclick = (event) => {
        // as precise time as possible
        const time = Date.now();

        event.preventDefault();

        if (state !== 'ready') return;

        state = 'pressed';

        fetch(`../backend/press.php?name=${name}&time=${time}&password=${password}`);
    }

    async function getData () {

        let rawQ = await fetch('../backend/get-q.php');
        let Q = await rawQ.json();

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

        // free memory
        rawQ = null;
        Q = null;

        setTimeout( () => requestAnimationFrame(getData), 200);
    }

    getData();
}

(async () => {
    const auth = await (await fetch(`../backend/valid-pass.php?password=${password}`)).text();
    if (auth === '1') {
        main();
    } else {
        window.location.assign('../');
    }
})();
