const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document)
const playlist = $('.playlist')
const cd = $('.cd')
const heading = $('header h2')
const thumb = $('.cd-thumb')
const cdInner= $('.cd-inner')
const audio = $('#audio')
const playBtn = $('.btn-toggle-play')
const player = $('.player')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
var isMusic = 'vietnamese'
const PlAYER_STORAGE_KEY = "MUSIC_APP";
const random = $('.btn-random')
const repeat = $('.btn-repeat')
const volumeIcon=$('.btn-volume')
const volumeRange=$('.volume-range')
let indexArray = []
const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    isMute: false,
    config: JSON.parse(localStorage.getItem(PlAYER_STORAGE_KEY)) || {},
    setConfig: function(key, value){
        this.config[key] = value
        localStorage.setItem(PlAYER_STORAGE_KEY,JSON.stringify(this.config))
    },
    songs: {
        vietnamese: [
            {
                name: "Cưới đi",
                singer: "2T, ChangC",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1002/CuoiDi-2TChangC-6560962.mp3?st=7gUqov6-llD_q5uix4xi3g&e=1646100812",
                image: "https://avatar-ex-swe.nixcdn.com/song/2020/08/27/8/e/c/f/1598516178659_500.jpg"
            },
            {
                name: "Matchanah",
                singer: "híu x bâu",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1012/Matchanah-HiuBau-6964032.mp3?st=5tq9KUXu5BFFq7Rc6rK41w&amp;e=1645452519",
                image: "https://avatar-ex-swe.nixcdn.com/song/2021/03/12/e/2/9/e/1615524008615_500.jpg"
            },
            {
                name: "Muộn Rồi Mà Sao Còn",
                singer: "Sơn Tùng M-TP",
                path: "https://c1-ex-swe.nixcdn.com/Believe_Audio19/MuonRoiMaSaoCon-SonTungMTP-7011803.mp3?st=tD-Ln6qGqkdH659AeuHsjQ&e=1638782546",
                image: "https://avatar-nct.nixcdn.com/song/2021/04/29/9/1/f/8/1619691182261.jpg"
            },
            {
                name: "2+3=5",
                singer: "T.R.I, Cammie",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui992/235VuxRemix-TRICammie-6134615.mp3?st=U4ZlleJmR5lP966agGegzg&amp;e=1645454104",
                image: "https://avatar-ex-swe.nixcdn.com/song/2019/11/08/0/8/6/9/1573194444107_500.jpg"
            },
            {
                name: "Độ Tộc 2",
                singer: "Masew, Độ Mixi, Phúc Du, Pháo",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1020/DoToc2-MasewDoMixiPhucDuPhao-7064730.mp3?st=ehahZN3-iX9xYdBFgDgGcg&e=1638782785",
                image: "https://avatar-nct.nixcdn.com/song/2021/08/10/b/2/e/0/1628579601228.jpg"
            },
            {
                name: "Thích em hơi nhiều",
                singer: "WREN EVANS",
                path: "https://c1-ex-swe.nixcdn.com/Unv_Audio198/ThichEmHoiNhieu-WrenEvans-7034969.mp3?st=bfekxnRjZgb4qlmc8eOLNw&amp;e=1645452787",
                image: "https://avatar-ex-swe.nixcdn.com/song/2021/06/18/d/c/e/c/1623997610871_500.jpg"
            },
            {
                name: "Yêu 5",
                singer: "Rhymastic",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui935/Yeu5-Rhymastic-4756973.mp3?st=5RAb4JGNd3P14r0cNO4tgw&amp;e=1645453161",
                image: "https://avatar-ex-swe.nixcdn.com/song/2017/11/27/7/d/1/c/1511770260582_500.jpg"
            },
            {
                name: "Crush 2",
                singer: "W/N, Tez, Tien",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui993/Crush2-WnTezTien-6174294.mp3?st=kCnQLvCoVDDJJ-l6TzYSQw&amp;e=1645453979",
                image: "https://avatar-ex-swe.nixcdn.com/song/2019/12/09/a/6/5/3/1575901559716_500.jpg"
            },
            {
                name: "Ngày tận thế",
                singer: "Tóc Tiên, Da LAB, Touliver",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui995/NgayTanThe-TocTienDaLABTouliver-6226260.mp3?st=PDrQ0e76nYuGYA7C3OWz2w&amp;e=1646106382",
                image: "https://avatar-ex-swe.nixcdn.com/song/2020/02/20/2/0/7/e/1582174982811_500.jpg"
            },
            {
                name: "Tháng Mấy Em Nhớ Anh?",
                singer: "Hà Anh Tuấn",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1014/ThangMayEmNhoAnh-HaAnhTuan-6995531.mp3?st=iB3-bnZG11y-YgQEsvD7nQ&amp;e=1646106481",
                image: "https://avatar-ex-swe.nixcdn.com/song/2021/04/01/e/2/b/5/1617248289520_500.jpg"
            }
        ],
        english: [
            {
                name: "Stay",
                singer: "The Kid LAROI, Justin Bieber",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1018/Stay-TheKidLAROIJustinBieber-7045258.mp3?st=tDMLXwH5rcrkO9nF-Y0mWA&e=1638769802",
                image: "https://avatar-nct.nixcdn.com/song/2021/07/09/5/5/8/2/1625815274622.jpg"
            },
            {
                name: "Shape Of You",
                singer: "Ed Sheeran",
                path: "https://c1-ex-swe.nixcdn.com/Warner_Audio38/ShapeOfYou-EdSheeran-6443488.mp3?st=SGFUixBV2-Y45i558SHUSQ&amp;e=1646096635",
                image: "https://avatar-ex-swe.nixcdn.com/song/2018/01/25/5/2/d/e/1516891769034_500.jpg"
            },
            {
                name: "We Don't Talk Anymore",
                singer: "Kina Grannis, Kurt Hugo Schneider, Mario Jose",
                path: "https://c1-ex-swe.nixcdn.com/Warner_Audio35/WeDonTTalkAnymoreFeatSelenaGomez-CharliePuth-6426101.mp3?st=kLw2MtqKzlKtod-q4KUs8w&amp;e=1646096635",
                image: "https://avatar-ex-swe.nixcdn.com/song/2017/09/27/a/9/e/f/1506480482657_500.jpg"
            },
            {
                name: "That girl",
                singer: "Austin Mahone; Rich Homie Quan",
                path: "https://c1-ex-swe.nixcdn.com/Sony_Audio83/ThatGirl-OllyMurs-6560207.mp3?st=SC2827i_ASfoTAR0qUlCYQ&amp;e=1646096635",
                image: "https://avatar-ex-swe.nixcdn.com/playlist/2018/06/25/3/b/6/e/1529907494260_500.jpg"
            },
            {
                name: "abcdefu",
                singer: "GAYLE",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1025/Abcdefu-GAYLE-7124987.mp3?st=EiUBn2cNqV7KIS3y4_RhQA&amp;e=1646208235",
                image: "http://data.chiasenhac.com/data/cover/62/61845.jpg"
            },
            {
                name: "Love Is Gone (Acoustic)",
                singer: " SLANDER; Dylan Matthew",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1000/LoveIsGoneAcoustic-SlanderDylanMatthew-6288644.mp3?st=EgG5-AjMMB0fTE2BMAHixQ&amp;e=1646208236",
                image: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2016/12/22/5/a/d/7/1482395364942.jpg"
            },
            {
                name: "Fade",
                singer: "Alan Walker",
                path: "https://c1-ex-swe.nixcdn.com/Sony_Audio60/Faded-AlanWalker-5919763.mp3?st=78FRgQR4FV-38jmgZQqKYw&amp;e=1646096635",
                image: "https://avatar-nct.nixcdn.com/song/2020/02/07/2/0/7/2/1581052824234.jpg"
            },
            {
                name: "Toxic",
                singer: "BoyWithUke",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1023/Toxic-BoyWithUke-7114178.mp3?st=Gqxi5ASK81gKBTtGbnRS5g&amp;e=1646096635",
                image: "https://avatar-ex-swe.nixcdn.com/song/2021/11/08/8/3/8/f/1636365547690.jpg"
            },
            {
                name: "Beautiful in White",
                singer: "Shane Filan",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui948/BeautifulInWhite-ShaneFilan-524801.mp3?st=j5Kz96eLVddSdIRv5YS8zA&amp;e=1646096635",
                image: "https://avatar-ex-swe.nixcdn.com/song/2017/08/26/6/e/9/5/1503758211114.jpg"
            },
            {
                name: "My Heart Will Go On",
                singer: "Celine Dion",
                path: "https://data51.chiasenhac.com/downloads/1002/1/1001533-e48441ea/32/My%20Heart%20Will%20Go%20On%20-%20Celine%20Dion.m4a",
                image: "https://avatar-ex-swe.nixcdn.com/song/2018/02/08/b/b/c/8/1518074877815.jpg"
            }
        ],
        korea: [
            {
                name: "Way Back Home ",
                singer: "SHAUN",
                path: "https://data32.chiasenhac.com/downloads/1927/1/1926577-5f437da4/128/Way%20Back%20Home%20-%20Shaun.mp3",
                image: "http://data.chiasenhac.com/data/cover/91/90875.jpg"
            },
            {
                name: "Fate",
                singer: "Lee Sun Hee",
                path: "https://data04.chiasenhac.com/downloads/1522/1/1521879-8afbaa75/128/Fate%20-%20Lee%20Sun%20Hee.mp3",
                image: "https://yt3.ggpht.com/ytc/AKedOLQh9PpdltgHcfbhzN-1xk2cHjzAIov7f0ISWpfT=s88-c-k-c0x00ffffff-no-rj"
            },
            {
                name: "Haru Haru",
                singer: "BIGBANG",
                path: "https://c1-ex-swe.nixcdn.com/YG_Audio1/HaruHaru-BIGBANG-6291516.mp3?st=Gspt0qSx7rVZoYeM-x2jXA&e=1638783344",
                image: "https://avatar-nct.nixcdn.com/song/2020/06/09/2/d/0/7/1591688793624.jpg"
            },
            {
                name: "Love Scenario",
                singer: "iKON",
                path: "https://c1-ex-swe.nixcdn.com/YG_Audio1/LoveScenario-iKON-6292220.mp3?st=GquH-Wmqa8cjZfNqRgIM7w&e=1638783344",
                image: "https://avatar-nct.nixcdn.com/song/2018/01/25/5/2/d/e/1516873006451.jpg"
            },
            {
                name: "This love",
                singer: "Davichi",
                path: "https://data2.chiasenhac.com/stream2/1649/1/1648632-670bcb1b/128/This%20Love%20-%20Davichi.mp3",
                image: "https://yt3.ggpht.com/ytc/AKedOLTfMfw8dt05QRIFlxZoOt86NhPpVCMaIRtJn4ni=s88-c-k-c0x00ffffff-no-rj"
            },
            {
                name: "Please Tell Me Why",
                singer: "Freestyle",
                path: "https://data37.chiasenhac.com/downloads/1892/2/1891508-053ec37f/128/Please%20Tell%20Me%20Why%20-%20Freestyle.mp3",
                image: "https://avatar-nct.nixcdn.com/song/2019/07/10/f/2/6/d/1562734599196.jpg"
            },
            {
                name: "Horang Suwolga",
                singer: "Sangnoksu, Narae",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1005/HorangSuwolga-SangnoksuNarae-6770371.mp3?st=Ks8apkixAmM2J_Yr8k0-eA&e=1638783344",
                image: "https://avatar-nct.nixcdn.com/song/2020/12/14/5/c/b/a/1607915686599.jpg"
            },
            {
                name: "Celebrity",
                singer: "IU",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1011/Celebrity-IU-6938138.mp3?st=iM5VWwaQtj1ImVGkz3bq8Q&e=1638783344",
                image: "https://avatar-nct.nixcdn.com/song/2021/03/01/7/7/d/0/1614570355625.jpg"
            },
            {
                name: "You(=I)",
                singer: "BOLBBALGAN4",
                path: "https://data32.chiasenhac.com/downloads/1927/1/1926560-62a0a9aa/128/You%20I%20-%20Bolbbalgan4%20(NhacPro.net).mp3?time=1646037587",
                image: "https://data.nhacpro.me/resize/140/data/avatar/e4f0cda86e90a377918e79e7cb1e185f.jpg?v=7z5dt5a"
            },
            {
                name: "Some",
                singer: "Bolbbalgan4",
                path: "https://data.nhacpro.me/download/59072af31aba84b3c58d9ec8b4226648.mp3?filename=Some%20-%20Bolbbalgan4&amp;time=1646037429",
                image: "https://data.nhacpro.me/resize/140/data/avatar/e4f0cda86e90a377918e79e7cb1e185f.jpg?v=7z5dt5a"
            },
            
        ],
        china: [
            {
                name: "Thần thoại-Endless Love",
                singer: "Thành Long, Kim Hee Sun",
                path: "https://data32.chiasenhac.com/downloads/1924/1/1923751-356ab440/128/Than%20Thoai%20Tuoi%20Dep%20-%20Endless%20Love%20-%20Tha.mp3",
                image: "http://data.chiasenhac.com/data/cover/91/90518.jpg"
            },
            {
                name: "Có chút ngọt ngào",
                singer: "Uông Tô Lang, BY2",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui983/CoChutNgotNgao-UongToLangSilenceWangBY2-3710201.mp3?st=_sDvo8AgOgPoEJ6iHwz_4A&amp;e=1646124481",
                image: "https://avatar-nct.nixcdn.com/singer/avatar/2017/11/15/6/3/7/1/1510737102145_600.jpg"
            },
            {
                name: "Thán Vân Hề / 叹云兮",
                singer: "Cúc Tịnh Y",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui966/ThanVanHe-CucTinhYJuJingYi-5521288.mp3?st=MXMPoZ1zkVZ3I-QPRW3YpQ&amp;e=1646124714",
                image: "https://avatar-nct.nixcdn.com/song/2018/07/03/3/1/0/7/1530610454995_640.jpg"
            },
            {
                name: "Người Theo Đuổi Ánh Sáng",
                singer: "Từ Vi",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui957/NguoiTheoDuoiAnhSang-TuVi-5334394_hq.mp3?st=bK169LdyP-BdTjuLld6WmQ&amp;e=1646125322",
                image: "https://avatar-ex-swe.nixcdn.com/song/2019/08/05/1/9/9/6/1565000881100_500.jpg"
            },
            {
                name: "Mang Chủng / 芒种",
                singer: "Âm Khuyết Thi Thính, Triệu Phương Tịnh (Zhao Fangjing)",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui983/MangChung-TrieuPhuongTinhAmKhuyetThiThinh-5989054.mp3?st=9WINGtCn0ciu3GtGJODdrQ&e=1638784935",
                image: "https://avatar-nct.nixcdn.com/song/2019/08/05/1/9/9/6/1565016156395.jpg"
            },
            {
                name: "Phương Xa (Lương Sơn Bá & Chúc Anh Đài OST)",
                singer: " Hồng Bố Điều, Lý Duyệt Quân",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui014/PhuongXaOSTLuongSonBaChucAnhD_3ufh.mp3?st=cI-HY5Jj2ls61dNsjPDZiQ&amp;e=1646126346&amp;download=true",
                image: "https://avatar-ex-swe.nixcdn.com/singer/avatar/2013/5592_Erika_Li_A.jpg"
            },
            {
                name: "Giữ chặt cậu(圈住你) -OST Chúng ta đáng yêu như thế nào",
                singer: "Nhất Khẩu Điềm",
                path: "https://data3.chiasenhac.com/downloads/2113/1/2112463-85a65713/128/Giu%20Chat%20Cau%20-%20Nhat%20Khau%20Diem.mp3",
                image: "https://data.chiasenhac.com/data/cover/127/126335.jpg"
            },
            {
                name: "Ái Thương",
                singer: "Đổng Trinh (Dong Zhen)",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui155/AiThuong-DongTrinh_35bzb.mp3?st=xwSnK7z8klRBvJR4sKuo3Q&e=1638784935",
                image: "https://avatar-nct.nixcdn.com/singer/avatar/2017/03/22/7/e/b/2/1490170353513.jpg"
            },
            {
                name: "Yêu, Tồn Tại / 爱, 存在",
                singer: "Lâm Tiểu Kha (Lin Xiao Ke)",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui1003/YeuTonTai-LamTieuKhaLinXiaoKe-6651465.mp3?st=m1Iax-KidyoK60ipL7hbdg&amp;e=1646127130",
                image: "https://yt3.ggpht.com/ytc/AKedOLRh_sdvGwPR1mCQ1D9uzo7Zb8gYADP9HV2mrhR9=s88-c-k-c0x00ffffff-no-rj"
            },
            {
                name: "Sứ Thanh Hoa / 青花瓷",
                singer: "Châu Kiệt Luân (Jay Chou)",
                path: "https://c1-ex-swe.nixcdn.com/NhacCuaTui964/SuThanhHoa-ChauKietLuanJayChou-108110.mp3?st=ieBMFvjQWp7apqOrblPsiQ&e=1638784935",
                image: "https://avatar-nct.nixcdn.com/song/2019/08/07/3/6/d/a/1565165369019.jpg"
            },
        ],
        love: [
        ],
    },
    // defineProperties: function() {
    //     Object.defineProperty(this, 'currentSong', {
    //         get: function() {
    //             return this.songs[currentMusic][this.currentIndex]
    //         }
    //     })
    // },
    handleEvents: function(isMusic) {
        // Xử lý scroll 
        const cdWidth = cd.offsetWidth;
        const _this = this
        document.onscroll = function() {
                const scrollTop = window.scrollY || document.documentElement.scrollTop;
                const newCdWidth = cdWidth - scrollTop;
                cd.style.width = newCdWidth > 0 ? newCdWidth + "px" : 0;
                cd.style.opacity = newCdWidth / cdWidth;
            }
        // Play songs
        playBtn.onclick = function() {
            if(_this.isPlaying){
                audio.pause()
            } else {
                audio.play()
                _this.config[isMusic] <=2 ? $(".song.active").scrollIntoView({
                    behavior: "smooth",
                block: "end",
                }) : _this.scrollToActiveSong(isMusic)
            }
        }

        // Animation thumb
        const animateThumb = cd.animate([
            {
                transform: "rotate(360deg)"
            }
        ], {
            duration: 10000,
            iterations: Infinity
        }) 
        animateThumb.pause()
        this.hendleAbumMusic(animateThumb)
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add("playing")
            cdInner.classList.add('active')
            $('.song.active .spectrum').classList.remove('paused')
            $('.song.active .spectrum').classList.add('active')
            animateThumb.play()            
        }
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove("playing")
            cdInner.classList.remove('active')
            $('.song.active .spectrum').classList.remove('active')
            $('.song.active .spectrum').classList.add('paused')
            animateThumb.pause()
        }
        // Tiến độ bài hát
        audio.ontimeupdate = function() {
            if (audio.duration){
                const progressPercent = Math.floor((audio.currentTime / audio.duration) * 100);
                progress.value = progressPercent
            }
        }
        // Tua bài hát
        progress.oninput = function (e){
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime
            audio.pause()
        }
        progress.onchange = function (e){
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime
            audio.play()
        }

        // Next một bài hát
        nextBtn.onclick = function () {
            if(_this.isRandom){
                _this.randomSong(isMusic)
            }
                _this.nextSong(isMusic)
                _this.renderSongs(isMusic)
                _this.scrollToActiveSong()
                audio.play()
        }
        // Prev một bài hát
        prevBtn.onclick = function () {
            if(_this.isRandom){
                _this.randomSong(isMusic)
            }
                _this.prevSong(isMusic)
                _this.renderSongs(isMusic)
                _this.scrollToActiveSong()
                audio.play()
        }
        // Khi kết thúc một bài hát
        audio.onended = function () {
            if(_this.isRandom){
                _this.randomSong(isMusic)
                audio.play()
            } 
            else if(_this.isRepeat){
                audio.play()
            }
            else {
                nextBtn.onclick()
            }
        }
        // random bài hát
        random.onclick = function () {
            if(_this.isRepeat){
                _this.isRepeat = !_this.isRepeat
                repeat.classList.toggle('active', _this.isRepeat)
                _this.setConfig('isRepeat',_this.isRepeat)

            }
                _this.isRandom = !_this.isRandom
                _this.setConfig('isRandom',_this.isRandom)
                random.classList.toggle('active', _this.isRandom)
        }
        repeat.onclick = function () {
            if(_this.isRandom){
                _this.isRandom = !_this.isRandom
                random.classList.toggle('active', _this.isRandom)
                _this.setConfig('isRandom',_this.isRandom)

            }
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat',_this.isRepeat)
            repeat.classList.toggle('active', _this.isRepeat)
        }
        //Khi click icon volume 
        volumeIcon.onclick=function(){
            //Khi volume=0 ấn thì tự nâng volume=0.5
            if(audio.volume===0){
              audio.volume=0.5
              volumeRange.value=50
              volumeIcon.classList.remove('muted')
            }//Khi volume!=0 thì nó là nút mute
            else{
              _this.isMute=!_this.isMute
            volumeIcon.classList.toggle('muted',_this.isMute)
            audio.muted=_this.isMute
            }
          }
          //Khi volumeRange thay đổi
          volumeRange.oninput =function(e){
            const volumes =e.target.value/100
                 audio.volume=volumes
                 //KHi đang mute mà thay đổi volume thì bỏ mute
                 if(_this.isMute){
                   volumeIcon.onclick()
                 }
                 //Volume=0 thì đổi sang icon mute 
                 if(volumes===0){
                   volumeIcon.classList.add('muted')
                 }else{
                   volumeIcon.classList.remove('muted')
                 }
            }
        // Chọn bài hát 
        playlist.onclick = function (e) {
            const songNode = e.target.closest(".song:not(.active)");
            if(songNode && !e.target.closest('.option')){
                isMusic == undefined ? isMusic = 'vietnamese' : ''
                _this.currentIndex = Number(songNode.dataset.index)
                _this.setConfig(isMusic,_this.currentIndex)
                _this.loadCurrentSong(isMusic)
                _this.renderSongs(isMusic)
                audio.play()
            }
            if(e.target.closest('.option')){
                var path = e.target.closest('.option').dataset.path
                    $('.blockoptions').classList.add('active')
                    $('.box').classList.add('active')
                    $('.download a').setAttribute('href', path)
            }
        }
            $('.box').onclick = function(e){
                e.target.classList.remove('active')
                $('.blockoptions').classList.remove('active')
            }
          
    },
    hendleAbumMusic: function(animateThumb){      
        const that = this
        $$('.locationmusic div').forEach(function(value){
            value.onclick = function(e){
                const valueIsMusic = e.target.getAttribute('value')
                if(!e.target.closest('.locationmusic > .select')){
                        switch(valueIsMusic) {
                            case 'vietnamese':
                                isMusic = 'vietnamese'
                                break;
                            case 'english':
                                isMusic = 'english'
                                break;
                            case 'korea':
                                isMusic = 'korea'
                                break;
                            case 'china':
                                isMusic = 'china'
                                break;
                          }
                        that.config[isMusic] == undefined ? that.setConfig(isMusic, 0) : '' 
                        that.config[isMusic] ? that.currentIndex = that.config[isMusic] : that.currentIndex = 0
                        indexArray = []
                        progress.value = 0
                        animateThumb.pause()
                        cdInner.classList.remove('active')
                        that.isPlaying = false;
                        player.classList.remove('playing')
                        cd.style.width = 200 + 'px'
                        cd.style.opacity = null;
                        that.renderSongs(isMusic)
                        that.handleEvents(isMusic)
                        that.loadCurrentSong(isMusic)
                        that.nextSong(isMusic)
                        that.prevSong(isMusic)
                        $('.locationmusic > .select').classList.remove('select')
                        e.target.classList.add('select') 
                        that.config[isMusic] <= 2 ? $(".song.active").scrollIntoView({
                            behavior: "smooth",
                        block: "end",
                        }) : that.scrollToActiveSong()                       
                }                    
            }
        })    
    },
    scrollToActiveSong: function () {
        setTimeout(() => {
            $(".song.active").scrollIntoView({
                behavior: "smooth",
                block: "center",
              }) 
        }, 0);
    },
    loadCurrentSong: function(isMusic) {
        heading.textContent = 
        this.config[isMusic] ? this.songs[isMusic][this.config[isMusic]].name 
        : this.songs[isMusic][this.currentIndex].name
        thumb.style.backgroundImage = 
       this.config[isMusic] ? `url(${this.songs[isMusic][this.config[isMusic]].image})` 
        : `url(${this.songs[isMusic][this.currentIndex].image})`
        audio.src = 
        this.config[isMusic] ? this.songs[isMusic][this.config[isMusic]].path 
        : this.songs[isMusic][this.currentIndex].path
    },
    renderSongs: function(music) {
        this.config['vietnamese'] == undefined ? this.setConfig('vietnamese', 0) : ''
        music == undefined ? music = 'vietnamese' : ''
        const htmls = this.songs[music].map((song,index) => 
            `
                <div class="song ${index === this.config[music] ? "active" : ''}" data-index="${index}">
                    <div class="thumb" style="background-image: url('${song.image}')">
                    </div>
                    <div class="body">
                        <h3 class="title">${song.name}</h3>
                        <p class="author">${song.singer}</p>
                    </div>
                    <div class="option" data-index="${index}" data-path="${song.path}" data-name="${song.name}" data-singer="${song.singer}" data-image="${song.image}">
                        <i class="fas fa-ellipsis-h"></i>
                    </div>
                    <div class="spectrum">
                        <div></div>
                    </div>
                    </div>
                
                `
        );
        playlist.innerHTML = htmls.join('')
    },
    
    nextSong : function(isMusic) {
        isMusic == undefined ? isMusic = 'vietnamese' : ''
        this.setConfig(isMusic, ++this.config[isMusic])
        ++this.currentIndex
        if(this.config[isMusic] >= this.songs[isMusic].length){
            this.setConfig(isMusic, 0)
            this.currentIndex = 0
        }
        this.loadCurrentSong(isMusic)
        // this.renderSongs(isMusic)
    },
    prevSong: function(isMusic) {
        isMusic == undefined ? isMusic = 'vietnamese' : ''
        this.setConfig(isMusic, --this.config[isMusic])
        --this.currentIndex
        if(this.config[isMusic] < 0){
            this.setConfig(isMusic, this.songs[isMusic].length - 1)
            this.currentIndex = this.songs[isMusic].length - 1
        }
        this.loadCurrentSong(isMusic)
        // this.renderSongs(isMusic)
    },
    randomSong: function(isMusic) {
        isMusic == undefined ? isMusic = 'vietnamese' : ''
        let newIndex;
        let _that = this
        if(indexArray.length === _that.songs[isMusic].length){
            indexArray = []
        }
        do {            
            newIndex = Math.floor(Math.random() * _that.songs[isMusic].length) 
        } 
        while(indexArray.includes(newIndex))
            indexArray.push(newIndex)
            _that.config[isMusic]  = newIndex
            _that.loadCurrentSong(isMusic)
            _that.renderSongs(isMusic)
            _that.scrollToActiveSong()
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat
    },

    start: function() {
        // ham xu ly music location
        this.hendleAbumMusic()

        // Hàm xử lý events DOM
        this.handleEvents()
        // Hàm lấy ra 1 song
        // this.defineProperties();

        

        // Hàm render ra List Songs
        this.renderSongs(isMusic)
        // Hàm load song
        this.loadCurrentSong(isMusic)
        // load dữ liệu config trên localStorage
        this.loadConfig()
        random.classList.toggle('active', this.isRandom || false)
        repeat.classList.toggle('active', this.isRepeat || false)

    }
}

app.start()

