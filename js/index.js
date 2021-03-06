"use strict";
const NewsApp = {
        initFields() {
            console.log('init')
            const inputForm = document.getElementById('NewsInput').addEventListener('submit', (e) => {
                e.preventDefault();
                const search = document.getElementById('NewsInputField').value;
                console.log(search);
                this.getNews(search);
            });
        },
        async getNews(likes) {
                fetch(`https://thecrew.cc/news/create.php`)
                    .then(response => {
                        return response.json();
                    })
                    .then(data => {
                        console.log(data);
                        let htmlString = `
                <h2>likes: ${data.main.likes}°</h2>
            `;
                        document.getElementById('NewsResult').innerHTML = htmlString;
                    });

                let News = {
                    News: News,
                    userInput: {
                        selectedSort: 'likes',
                        selectedArticles: 'all'
                    },

                    applyAll: function () {

                        this.filterNews();
                        this.sortNews();
                        this.calculateTotalLikes();
                        this.renderNews();
                    },
                    filterNews: function () {

                        this.News = News.filter((item) => {
                            if (gallery.userInput.selectedArticles == "all") {
                                return true;
                            }
                            return item.selectedArticles == gallery.userInput.selectedArticles;
                        });
                    },
                    sortNews: function () {
                        this.paintings.sort((a, b) => {
                            return a[gallery.userInput.selectedSort] - b[gallery.userInput.selectedSort];
                        });
                    },
                    initEvents: function () {
                        const sortRadios = document.getElementsByName('sortBy');
                        sortRadios.forEach(function (radio) {
                            radio.addEventListener('change', function (event) {
                                gallery.userInput.selectedSort = this.value;
                                gallery.applyAll();
                            });
                        });
                        const filterRadios = document.getElementsByName('artist');
                        filterRadios.forEach(function (radio) {
                            radio.addEventListener('change', function (event) {
                                gallery.userInput.selectedArtist = this.value;
                                gallery.applyAll();
                            });
                        });
                    },
                    renderNews: function () {
                        const section = document.getElementById('content_section');
                        section.innerHTML = "";
                        this.paintings.forEach(function (item) {
                            const html = `<article>
          <div class="article_content_wrapper">
            <div>
              <h3>${item.title}</h3>
              <h4>${item.article}</h4>
            </div>
            <div>
              <div class="likes">${item.likes}</div>
              <div class="date">${item.auctionDate}</div> 
            </div>
          </div>
        </article>`;
                            section.insertAdjacentHTML('beforeend', html);
                        });
                    },
                    calculateTotalLikes: function () {
                        // map
                        const mappedNews = this.News.map((item) => {
                            return item.likes;
                        });

                        const totalLikes = mappedNews.reduce((acc, cur) => {
                            return acc + cur;
                        });

                        const roundedPrice = Math.round(totalLikes * 100) / 100;

                        const box = document.getElementById('total');
                        box.innerText = roundedPrice;
                        // reduce
                    }
                };

                gallery.initEvents();
                gallery.applyAll();