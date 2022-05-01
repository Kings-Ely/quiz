
async function main () {
    const QDIV = document.getElementById('q');

    async function getData () {

        const rawQ = await fetch('../backend/get-q.php');
        const Q = (await rawQ.json()).sort((a, b) => a.time - b.time);
        if (Q.length) {
            let first = Q[0].time;

            QDIV.innerHTML = '';

            for (let press of Q) {
                const { name, time } = press;
                const place = Q.indexOf(press);

                QDIV.innerHTML += `
            <p class="q-element">
                ${place+1} ${name} ${place === 0 ? '' : `(${((time-first)/1000).toPrecision(3)}s behind)`}
            </p>
        `;
            }
        }

        setTimeout( () => requestAnimationFrame(getData), 0);
    }

    getData();

    document.getElementById('clear').onclick = async () => {
        await fetch('../backend/clear-q.php');
    }
}

if (prompt('Password') === '123') {
    main();
}