/*
 * Copyright 2020 Hampus Ram <hampus.ram@educ.goteborg.se>.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

window.addEventListener("load", () => {
    const randomAPI = "/api/fortune"
    const shortAPI = "/api/short"
    const showerAPI = "/api/showerthought"
    const tradAPI = "/api/traditional"
    const searchAPI = "/api/query?q="

    const fortunes = document.getElementById("fortunes")

    async function fortuneGenerator(API, action) {
        try {
            let resp = await fetch(API)
            let json = await resp.json()

            if (action === "get") {
                let pre = document.createElement("pre")
                pre.textContent = json.fortune
                fortunes.prepend(pre)
                limitOfTen(fortunes)
            }
            if (action === "search") {
                let topTenSearch = Array.from(json).slice(0, 10)

                topTenSearch.forEach((element) => {
                    let pre = document.createElement("pre")
                    pre.textContent = element.fortune
                    fortunes.prepend(pre)
                    limitOfTen(fortunes)
                })
            }
        } catch (err) {
            console.error(err)
            window.alert(err)
        }
    }

    const elems = {
        random: randomAPI,
        short: shortAPI,
        shower: showerAPI,
        traditional: tradAPI,
    }

    for (let id in elems) {
        let button = document.getElementById(id)
        button.addEventListener("click", () => fortuneGenerator(elems[id], "get"))
    }

    //Search field
    let searchField = document.getElementById("search-field")

    let input = searchField.addEventListener("keyup", (e) => {
        input = e.target.value
    })

    //Search button
    let searchButton = document.getElementById("search-button")

    //Click for seach button
    searchButton.addEventListener("click", () => {
        if (input.length < 3 || input.value === null) {
            window.alert("A search must contain at least three characters")
        }

        fortuneGenerator(searchAPI + input, "search")
    })
    //Enter key for search button
    searchField.addEventListener("keypress", (e) => {
        if (e.key === "Enter") {
            e.preventDefault()
            fortuneGenerator(searchAPI + input, "search")
        }
    })

    // Limits number of fortunes displayed to 10
    function limitOfTen(elem) {
        if (elem.childElementCount >= 10) {
            elem.lastChild.remove()
        }
    }
})
