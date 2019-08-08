import { useEffect } from "react";
import { getCookie, getUserStorage, getStorage, setCookie, setStorage } from "../utils";
import { LOCAL } from "../client/constant";
import Fetch from "@amanooo/fetch";

function Bg() {
    async function visit() {
        const { errMsg } = await Fetch.get('/api/visit')
        if (!errMsg) {
            setStorage(LOCAL.MARK_VISIT, '1')
        }
    }
    async function markingLogin(id: number) {
        await Fetch.get('/api/user/version', { id })
    }
    useEffect(() => {
        const markLogin = getCookie(LOCAL.MARK_LOGIN)
        // console.log('bg markLogin:', markLogin);
        if (markLogin) return

        const user = getUserStorage()
        // console.log('bg user: ', user);
        user.id && markingLogin(user.id)

        const markVisit = getStorage(LOCAL.MARK_VISIT)
        // console.log('bg markVisit: ', markVisit);
        !markVisit && visit()
    }, [])
    return <div></div>
}

export default Bg