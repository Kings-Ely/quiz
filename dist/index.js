function main () {
    document.body.onclick = async (e) => {

        const time = Date.now();

        e.preventDefault();

        await fetch(`backend/press.php?name=${name}&time=${time}`);
    }
}

main();