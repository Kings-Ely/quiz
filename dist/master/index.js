const password = prompt('Password');

async function main () {
    const $presses = document.getElementById('q');

    const buzzer = new Audio('buzzer.mp3');
    buzzer.setAttribute('preload', 'auto');

    const ding = new Audio('ding.wav');
    buzzer.setAttribute('preload', 'auto');

    let Q = [];

    function draw () {
        $presses.innerHTML = '';

        if (!Q.length) {
            $presses.innerHTML = '<p style="font-size: xxx-large; text-align: center">...</p>';
            return;
        }
        let first = Q[0].time;

        let i = 0;
        for (let press of Q) {
            if (i === 3) {
                $presses.innerHTML += '<p style="font-size: xxx-large; text-align: center">...</p>';
            }
            const { name, time } = press;
            const place = Q.indexOf(press);

            $presses.innerHTML += `
                <p class="q-element">
                    <span style="color: grey">
                        ${place + 1}
                    </span>
                    <span style="padding-left: 5%">
                        ${name}
                    </span>
                    <span style="float: right; color: grey">
                        ${place === 0 ? '' : `(${(time - first).toPrecision(3)}s behind)`}
                    </span>
                </p>
            `;

            i++;
        }
    }

    async function getData () {

        const rawQ = await fetch('../backend/get-q.php');
        const newQ = (await rawQ.json()).sort((a, b) => a.time - b.time);
        if (newQ.length !== Q.length) {
            buzzer.play();
        }
        Q = newQ;

        draw();

        setTimeout( () => requestAnimationFrame(getData), 0);
    }

    getData();

    document.getElementById('clear').onclick = async () => {
        await fetch(`../backend/clear-q.php?password=${password}`);
        ding.play();
        Q = [];
        draw();
    }
}

(async () => {
    if (await (await fetch(`../backend/valid-pass.php?password=${password}`)).text() === '1') {
        main();
    } else {
        window.location.assign('../');
    }
})();
