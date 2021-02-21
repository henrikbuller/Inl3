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

/* Author of this version: Henrik Büller, Java20 YRGO
 */

window.addEventListener("load", () => {
    const randomAPI = "/api/fortune"
    const shortAPI = "/api/short"
    const showerAPI = "/api/showerthought"
    const tradAPI = "/api/traditional"
    const searchAPI = "/api/query?q="

    const elems = {
        random: randomAPI,
        short: shortAPI,
        shower: showerAPI,
        traditional: tradAPI,
    }
    const fortunes = document.getElementById("fortunes")

    async function fortuneGenerator(API, action) {
        try {
            let resp = await fetch(API)
            if (!resp.ok) {
                throw new Error(resp.statusText)
            }
            let json = await resp.json()

            if (action === "get") {
                limitOfTen(fortunes)
                let pre = document.createElement("pre")
                pre.textContent = json.fortune
                fortunes.prepend(pre)
            }
            if (action === "search") {
                let topTenSearch = Array.from(json).slice(0, 10)

                topTenSearch.forEach((element) => {
                    limitOfTen(fortunes)
                    let pre = document.createElement("pre")
                    pre.textContent = element.fortune
                    fortunes.prepend(pre)
                })
            }
        } catch (error) {
            console.error(error)
            window.alert("Sorry, something went wrong!\n" + error)
        }
    }

    fortuneGenerator(randomAPI, "get")

    for (let id in elems) {
        let button = document.getElementById(id)
        button.addEventListener("click", () => fortuneGenerator(elems[id], "get"))
    }

    let searchField = document.getElementById("search-field")
    let searchButton = document.getElementById("search-button")

    searchButton.addEventListener("click", () => {
        let searchInput = searchField.value
        if (searchInput.length < 3) {
            window.alert("A search must contain at least three characters")
            return
        }

        fortuneGenerator(searchAPI + searchInput, "search")
    })

    //Enter key for search button
    searchField.addEventListener("keypress", (e) => {
        let searchInput = searchField.value

        if (e.key === "Enter") {
            if (searchInput.length < 3) {
                window.alert("A search must contain at least three characters")
                return
            }
            console.log(searchInput)
            e.preventDefault()
            fortuneGenerator(searchAPI + searchInput, "search")
        }
    })

    // Limits number of fortunes displayed to 10
    function limitOfTen(elem) {
        if (elem.childElementCount >= 10) {
            elem.lastChild.remove()
        }
    }
})
