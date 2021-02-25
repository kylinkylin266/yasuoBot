/**
 *
 * @param {String} input
 */
import { getInfo, standardlize, sendChampionInfo } from "./function";

export const inputHandle = async function (input) {
    var args = input.split(" ");
    switch (args.length) {
        case 3:
            var action = args[1];
            if (action == "info") {
                let value = args[2];
                let info = await getInfo(value).then((res) => {
                    return res;
                });
                if (info != null) {
                    return sendChampionInfo(info);
                }
            }
        case 4:
            var action = args[1];
            let type = args[3];
            if (action == "info") {
                let value = args[2];
                let info = await getInfo(value, type).then((res) => {
                    return res;
                });
                if (info != null) {
                    return sendChampionInfo(info);
                }
            }
    }

};