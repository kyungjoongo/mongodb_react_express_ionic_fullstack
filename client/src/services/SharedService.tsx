// @ts-ignore
// @ts-ignore
export function makeSnapshotData(snapshot: any) {
    let _results: any = [];
    let _last: any;
    // @ts-ignore
    snapshot.forEach((doc) => {
        let itemOne = {
            data: doc.data(),
            _id: doc.id,
        }
        _results.push(itemOne)
        _last = doc.data();
    })

    return {
        results: _results,
        last: _last.date.toString()
    };
}

export async function getFirstData(db: any, limit: number,) {
    try {
        const snapshot = await db.collection('test')
            .orderBy('date', "desc")
            .limit(limit)
            .get()
        let resultMap = makeSnapshotData(snapshot)

        return resultMap;
    } catch (e) {

        alert(e.toString())
    }
};

export function getFileExtension3(filename: any) {
    return filename.slice((filename.lastIndexOf(".") - 1 >>> 0) + 2);
}

