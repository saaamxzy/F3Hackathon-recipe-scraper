const fetch = require('node-fetch');
const cheerio = require('cheerio');

const searchKeyword = async function(keyword) {
    console.log("Search Keyword: " + keyword);

    const res = await fetchData(keyword) ;
    const text = await res.text();
    const jsonRes = getAsins(text);

    return jsonRes;
};

const getAsins = function(html) {
    // console.log(html);
    const $ = cheerio.load(html);
    console.log($('.a-declarative[data-action=fresh-add-to-cart]').first());
    const json = JSON.parse($('.a-declarative[data-action=fresh-add-to-cart]').first().attr('data-fresh-add-to-cart'));
    const asin = json["asin"];
    const offerListingId = json["offerListingID"];

    return {asin: asin, offerListingID: offerListingId};
};

const fetchData = async function(keyword) {
    const url = `https://www.amazon.com/s/ref=nb_sb_noss_2?url=search-alias%3Damazonfresh&field-keywords=${keyword}`;

    return await fetch(url, {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9",
            "downlink": "5.55",
            "ect": "4g",
            "rtt": "150",
            "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "cookie": "ubid-acbsg=358-5680536-1525111; aws-ubid-main=405-7212464-3602772; awsc-color-theme=light; x-acbsg=\"r?8bWp6aTj68MjImGjYKVy7ZpnVgW56rPcoMFBP1g0n?S9U6kccGGiBU7SprOwe4\"; at-acbsg=Atza|IwEBIJHW-mHZO9rFrqASjaF7rGJ-EO0K3_UsJOX0yaFog5qqguaDNRkWaezsvT-_e43CjP5-gotDL0Qjz8Sd-vcIHiQv12laZBTKozcoRikDcZsTcR-bxqpvynB1Wnq0-Q6ob9qu959TnwfDczI2AfrBGNFbs_9US3FsIf-WhDllV4rHI5rvgPw02S93TFEBJZd4FkX_VeDXzf2Kkw8w35JBM4VfbqmAKMuCQVtpMZ6TiZX3nA; sess-at-acbsg=\"IO1EgyjmVIkto/yQVi9sa7CWob9w+oBujzHWmiD5ApM=\"; ubid-tacbus=131-2673422-5610654; remember-account=false; ubid-acbuk=262-5485132-5195514; x-acbuk=HFjt06wMOoPFlZIhmPq02qjn2zXBYAVJ1ropeRVzXpuWETyYPLHMXIO3FHzdtFrr; at-acbuk=Atza|IwEBIOjy8EVhxpkJIwfkf3ZtCiC7MLdnDeA3gUqRoVu2Z8xDyxPGD56RdDZfTROlyi2mNhn2rLgbJiBpjzgpZXw2uMUWdetn4rbwaWDrQAL5B2FFOqU0uy9YC66InwqJg-U7_3IkXXAXRzf52fKEn3Kx2Uu-f1P1r2OQPHALBoTpKi3ltTRPIUI87rUaghCx37OxBNecnSi31sEjQXEy7Y6ntJa1; sess-at-acbuk=\"e4inemNAh8HLT7VieO2hBVsep7FbqeJDsRKh+wvthgw=\"; sst-acbuk=Sst1|PQHpiMP9HIgReAEdqFQG646gCZg9WzYA_JKjiVUmxlbf_390NKKCAN3qX4UTuKVI-vZh8ObAsTTdNLD3l1AxE7pCFfiaUnrKsvRcF-0Dn24Si6ZxA7kIQRPQA6DrflyC5CAeY4pCQx3_mGrFNVjOt8lJhleRGkb0JrgXvFva6ZYj-iCHrviaPf44Fspk_qc0FKvf5inBuCBoVh6XhjYJqJ39RiSu2dNW6_LcnyZ6Ar6iObR4shtoP1T-C9pPfxmeg4cyYKMbyX3Jgc_-lgFs-xcrcd-6etNDEFAswAt4PVvzuog; ubid-main=132-7505864-1255315; ubid-acbde=259-2701502-7912641; ubid-acbjp=356-5292008-0789751; noflush_awsccs_sid=ea9e572dd4ef8ef2e1fcc8af0ceacb8e79bb533297e4aad36ba97f350a2b6ca8; s_cc=true; aws-mkto-trk=id%3A112-TZM-766%26token%3A_mch-aws.amazon.com-1636751912908-17523; aws_lang=en; session-id=132-6285241-0758213; skin=noskin; AMCV_7742037254C95E840A4C98A6%40AdobeOrg=1585540135%7CMCIDTS%7C18947%7CMCMID%7C63214903638751128250443499059995772384%7CMCAAMLH-1637688697%7C9%7CMCAAMB-1637688697%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1637091097s%7CNONE%7CMCAID%7C301F3ED3A2C76451-40001C7C8515CB27%7CvVersion%7C4.4.0; JSESSIONID=2F9B22BE1526389AE8F5FCFA402890D9; s_fid=5F4A308B6CFE446F-3535CF35F8BDAC3D; aws-userInfo=%7B%22arn%22%3A%22arn%3Aaws%3Asts%3A%3A696823148758%3Aassumed-role%2FIibsAdminAccess-DO-NOT-DELETE%2FConduitAccountService%2BProd%2BDefault%2BNA%2BFleet%2BP-fffajard%22%2C%22alias%22%3A%22696823148758%22%2C%22username%22%3A%22assumed-role%252FIibsAdminAccess-DO-NOT-DELETE%252FConduitAccountService%252BProd%252BDefault%252BNA%252BFleet%252BP-fffajard%22%2C%22keybase%22%3A%22%22%2C%22issuer%22%3A%22https%3A%2F%2Faccess.amazon.com%2Faws%22%2C%22signinType%22%3A%22PUBLIC%22%7D; s_sq=%5B%5BB%5D%5D; _rails-root_session=RGM3M2tCaENBMzdxc254MUdadGZXU1I5U2pyU1JsZEVZajJhUG4wU2xaSGVmcVYrYmhrazNjV0hkdVdlWGlncy9FZ3ZIOWhoZDZKaklsSWNVTk00MHJxSTY0VE9iUi9PYjBEbEVrYnN4UmlMRm4vMm9zaEJYeUxSR3FPTDdheC9xcmNmNzVoU0crR3JKb0JXSlF6K0N2VzJObE4xUEsvc1JEekZ2bHNpOEJ2cjlsUXRKdTMrVG9ORW11bFpON2d5LS1jbU0xZExMb2Zobi9ZSDhiMC9XZUdnPT0%3D--0b7657076c336f5e3359826b779278eb1578693c; amzn_sso_rfp=1fecb195783e3928; RT=\"z=1&dm=amazon.com&si=a6402b40-bb4c-4813-8a75-d65e36da937b&ss=kw3sncnq&sl=1&tt=1ey&ld=1ih&ul=f64&hd=f6c\"; session-token=E9qNpWmfcQekqhUbv4X41rESQdayIuiO2qSWbG3QdV6VDo4sC1fGoEu7o6QXL3fIq1cT2sSB4fePLl7CICEfRwge6lhIVkYHwbWMn19cLwfAufGPWdYblTih+ge2NaIPFUSE2wjFKoDrLgZx5RRa++UH/lpi+9vVyiqXjXufcz+pZrApCDA3IImyg/a6u18hSmWxuQ+zEIlJdCIxKcZOTyRiW+a7gldMQc9wOGgRxFvdeoXkFgq183Z4FMyEg6pnWmMhPVkCJBOr5KR771lelvMI5rBx9LKT; x-main=j6jHloDW6ijfH6yICEOQv5G5dT01pz5lnUBD6QdFyLsjjaZG8wGaOOIMdzazGi1r; at-main=Atza|IwEBIFC--mNQERy-F5Uo6BtgvbH4VN_ekIqLQQg3jRi5WFGDsqqU88QxY5Xx_vcE3rrIn7CBvwHyrpW6z2NQDVG5_EJC2mMw2F6s5maVSnsjM7GFSDYdiu-Axb083DAes4WopO41Lgr8keKarQpRsx5psOPEac8HKzIoimF1h0PasXPEDXI84dYWwz1yJygJjqrmWuIRvZjAmRb6sH-GnwncZydY; sess-at-main=\"MrKvGI33FF7YKbbxtrZKwgt2X2Wr3YhsTMaClicSQN0=\"; sst-main=Sst1|PQHpqi56cE9SsF-S9zYSvZccCZUtCdVBbeFTEU2qJ7cp6upbr4hKEFmXEGaC48Wdls4byv4lQ_6qFTGUtp_9bDC3nK0DVDyvlhmInuwN0eNQ4pKa_1kdrsNYf2ElMOylke9filOSEfRTansiI79NZUrPCWCfqO7LN5m5LFTet56MkzhAmKQ-T_OtCGS1XqcbJkHwSJDYdlLWBRlRvR5hVU6vcyDez_Vkrlcw_wASDck37L_y6JSYTLDRRW0TDL-mebp8vs4QU9rQkW019Nmrt8OaA9Jr2r-T6weML-pEkOE2WXg; lc-main=en_US; session-id-time=2082787201l; i18n-prefs=USD; csm-hit=tb:BKTXQ3S8CVZRZR67JR5Q+s-MCHKRJV2Z2EVWEFFVFT4|1637191637396&t:1637191637396&adb:adblk_no",
            "Referer": "https://www.amazon.com/alm/storefront?almBrandId=QW1hem9uIEZyZXNo",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    });
}
exports.searchKeyword = searchKeyword;