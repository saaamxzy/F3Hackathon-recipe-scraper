const fetch = require('node-fetch');
const cheerio = require('cheerio');

const searchKeyword = async function(keyword) {
    console.log("Search Keyword...");

    const res = await fetchData(keyword);

    const text = res.text();
    const jsonRes = getAsins(text);

    return jsonRes;
};

const getAsins = function(html) {
    const $ = cheerio.load(html);

    const json = JSON.parse($('.a-declarative[data-action=fresh-add-to-cart]').first().attr('data-fresh-add-to-cart'));
    const asin = json["asin"];
    const offerListingId = json["offerListingID"];

    console.log("Found ASIN: " + asin + " and offerListingId: " + offerListingId);
    return {asin: asin, offerListingID: offerListingId};
};

const fetchData = async function(keyword) {
    const url = `https://www.amazon.com/s/ref=nb_sb_noss_1?url=search-alias%3Damazonfresh&field-keywords=${keyword}`;

    return fetch(url, {
        "headers": {
            "accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
            "accept-language": "en-US,en;q=0.9",
            "downlink": "6.85",
            "ect": "4g",
            "rtt": "100",
            "sec-ch-ua": "\"Google Chrome\";v=\"95\", \"Chromium\";v=\"95\", \";Not A Brand\";v=\"99\"",
            "sec-ch-ua-mobile": "?0",
            "sec-ch-ua-platform": "\"macOS\"",
            "sec-fetch-dest": "document",
            "sec-fetch-mode": "navigate",
            "sec-fetch-site": "same-origin",
            "sec-fetch-user": "?1",
            "upgrade-insecure-requests": "1",
            "cookie": "ubid-acbsg=358-5680536-1525111; aws-ubid-main=405-7212464-3602772; awsc-color-theme=light; x-acbsg=\"r?8bWp6aTj68MjImGjYKVy7ZpnVgW56rPcoMFBP1g0n?S9U6kccGGiBU7SprOwe4\"; at-acbsg=Atza|IwEBIJHW-mHZO9rFrqASjaF7rGJ-EO0K3_UsJOX0yaFog5qqguaDNRkWaezsvT-_e43CjP5-gotDL0Qjz8Sd-vcIHiQv12laZBTKozcoRikDcZsTcR-bxqpvynB1Wnq0-Q6ob9qu959TnwfDczI2AfrBGNFbs_9US3FsIf-WhDllV4rHI5rvgPw02S93TFEBJZd4FkX_VeDXzf2Kkw8w35JBM4VfbqmAKMuCQVtpMZ6TiZX3nA; sess-at-acbsg=\"IO1EgyjmVIkto/yQVi9sa7CWob9w+oBujzHWmiD5ApM=\"; ubid-tacbus=131-2673422-5610654; remember-account=false; ubid-acbuk=262-5485132-5195514; x-acbuk=HFjt06wMOoPFlZIhmPq02qjn2zXBYAVJ1ropeRVzXpuWETyYPLHMXIO3FHzdtFrr; at-acbuk=Atza|IwEBIOjy8EVhxpkJIwfkf3ZtCiC7MLdnDeA3gUqRoVu2Z8xDyxPGD56RdDZfTROlyi2mNhn2rLgbJiBpjzgpZXw2uMUWdetn4rbwaWDrQAL5B2FFOqU0uy9YC66InwqJg-U7_3IkXXAXRzf52fKEn3Kx2Uu-f1P1r2OQPHALBoTpKi3ltTRPIUI87rUaghCx37OxBNecnSi31sEjQXEy7Y6ntJa1; sess-at-acbuk=\"e4inemNAh8HLT7VieO2hBVsep7FbqeJDsRKh+wvthgw=\"; sst-acbuk=Sst1|PQHpiMP9HIgReAEdqFQG646gCZg9WzYA_JKjiVUmxlbf_390NKKCAN3qX4UTuKVI-vZh8ObAsTTdNLD3l1AxE7pCFfiaUnrKsvRcF-0Dn24Si6ZxA7kIQRPQA6DrflyC5CAeY4pCQx3_mGrFNVjOt8lJhleRGkb0JrgXvFva6ZYj-iCHrviaPf44Fspk_qc0FKvf5inBuCBoVh6XhjYJqJ39RiSu2dNW6_LcnyZ6Ar6iObR4shtoP1T-C9pPfxmeg4cyYKMbyX3Jgc_-lgFs-xcrcd-6etNDEFAswAt4PVvzuog; ubid-main=132-7505864-1255315; ubid-acbde=259-2701502-7912641; ubid-acbjp=356-5292008-0789751; noflush_awsccs_sid=ea9e572dd4ef8ef2e1fcc8af0ceacb8e79bb533297e4aad36ba97f350a2b6ca8; s_cc=true; aws-mkto-trk=id%3A112-TZM-766%26token%3A_mch-aws.amazon.com-1636751912908-17523; aws_lang=en; session-id=132-6285241-0758213; skin=noskin; AMCV_7742037254C95E840A4C98A6%40AdobeOrg=1585540135%7CMCIDTS%7C18947%7CMCMID%7C63214903638751128250443499059995772384%7CMCAAMLH-1637688697%7C9%7CMCAAMB-1637688697%7CRKhpRz8krg2tLO6pguXWp5olkAcUniQYPHaMWWgdJ3xzPWQmdj0y%7CMCOPTOUT-1637091097s%7CNONE%7CMCAID%7C301F3ED3A2C76451-40001C7C8515CB27%7CvVersion%7C4.4.0; lc-main=en_US; x-main=\"sDuUunofHSc26?1QwL7zq6VTkS9VRu1K\"; at-main=Atza|IwEBIAEYpSsTXMnpfIleECdOMj9VjIpgIWZrSHWUxSq-K3F0wVDthEL8kmZLdcaGNW2m6M2N-ZxiaeRxUAdrDHAud-pEcWu-kSdYmgXdo4VO1gZXkTx5FAEJKSIceZ4cWYM62yHzh4xr7HAqODbyAI68kHCTu3DuncuLWzYbVnaDgCgOtfnaPGHIxJAU7epOzGHyDWIpSSp-YaFWX7o3W6rkxB9h; sess-at-main=\"hE/XQ3TxqeOh/viR4sfiAzzhjpSTtPrE3zQkZICOEp4=\"; sst-main=Sst1|PQHgVB48wZWI6OWF8lDya3E5CQK5lt5qcRUiXesVDNU6DqbDlptIC4Q5jwLZKW0qiKz-nRUoQ1GqUDBLwT_Wz4V8bNHXq-yBTlbT1zfTEJT8MnDmv_9Ji-ZgbWR9S1LtWTTG27IzJ03IJSP_ylNOGC7xtHKiUONp6pgL23OYbL3fykNFf8sErRF7h2_tQy93qfgLRStY9rE1KE2YAz3bR6kPJM7OFaTkVat7bhc-mjqYvxfX88xPb9DGahYPoAQwtJP9aINIs2cR9CWv_NHIkKFsR1lz8imb9gIQ528ojtrDdEM; i18n-prefs=USD; JSESSIONID=2F9B22BE1526389AE8F5FCFA402890D9; s_fid=5F4A308B6CFE446F-3535CF35F8BDAC3D; aws-userInfo=%7B%22arn%22%3A%22arn%3Aaws%3Asts%3A%3A696823148758%3Aassumed-role%2FIibsAdminAccess-DO-NOT-DELETE%2FConduitAccountService%2BProd%2BDefault%2BNA%2BFleet%2BP-fffajard%22%2C%22alias%22%3A%22696823148758%22%2C%22username%22%3A%22assumed-role%252FIibsAdminAccess-DO-NOT-DELETE%252FConduitAccountService%252BProd%252BDefault%252BNA%252BFleet%252BP-fffajard%22%2C%22keybase%22%3A%22%22%2C%22issuer%22%3A%22https%3A%2F%2Faccess.amazon.com%2Faws%22%2C%22signinType%22%3A%22PUBLIC%22%7D; s_sq=%5B%5BB%5D%5D; _rails-root_session=RGM3M2tCaENBMzdxc254MUdadGZXU1I5U2pyU1JsZEVZajJhUG4wU2xaSGVmcVYrYmhrazNjV0hkdVdlWGlncy9FZ3ZIOWhoZDZKaklsSWNVTk00MHJxSTY0VE9iUi9PYjBEbEVrYnN4UmlMRm4vMm9zaEJYeUxSR3FPTDdheC9xcmNmNzVoU0crR3JKb0JXSlF6K0N2VzJObE4xUEsvc1JEekZ2bHNpOEJ2cjlsUXRKdTMrVG9ORW11bFpON2d5LS1jbU0xZExMb2Zobi9ZSDhiMC9XZUdnPT0%3D--0b7657076c336f5e3359826b779278eb1578693c; session-id-time=2082787201l; amzn_sso_rfp=1fecb195783e3928; RT=\"z=1&dm=amazon.com&si=a6402b40-bb4c-4813-8a75-d65e36da937b&ss=kw3sncnq&sl=1&tt=1ey&ld=1ih&ul=f64&hd=f6c\"; session-token=\"UBLN5aZhyqGFPhHfeqoIl/n05mvjSo/qNVlIFbwg76buLoN1QgkMWUHz0leBK+ZZJ/Gitwh39+dKsuWZh9An4+L5D33M5Uqm3Qp7zR3h7U4Gd9yvHWROkJn3VUtHNBqRhgAj7cFg9FMqw9uhmfDOb0OtikWppLyMCOE1IyJXi6CGH/BfsleanG63cQ/YJtpxMKKiI0tnGuythax/THUJuQ==\"; csm-hit=tb:GHAGQ8RG2PXP9Y43CPDP+s-J1VSMA5J2AVK3X41K1H3|1637178001704&t:1637178001704&adb:adblk_no",
            "Referer": "https://www.amazon.com/cart/localmarket?almBrandId=QW1hem9uIEZyZXNo&ref_=dnav_alm_cart",
            "Referrer-Policy": "strict-origin-when-cross-origin"
        },
        "body": null,
        "method": "GET"
    });
}

exports.searchKeyword = searchKeyword;