import { inject, Injectable } from '@angular/core';
import { HttpClientBuilder } from '@bidv-auth/cdk';

@Injectable({
  providedIn: 'root',
})
export class IssuanceServices {
  readonly #httpClient = inject(HttpClientBuilder);

  private fakedStep2Data = {
    acn: '85082',
    aph: '0944005839',
    boc: '650000',
    bocDesc: 'CN BINH DUONG',
    boo: '650000',
    booDesc: 'CN BINH DUONG',
    ccode: 'N1',
    ccodeDesc: 'KHACH HANG HANG PHO THONG',
    cifoff: '65000908',
    cifoffDesc: 'NGUYEN TIEN PHONG',
    citzshp: 'VN',
    citzshpDesc: 'VIET NAM',
    dao: '11/07/2000',
    dob: '20/07/1969',
    email: 'nkwkyiu.dga@jwg.jyx.xq',
    idexp: '0',
    idexpDesc: 'CON HAN',
    legal: 'I',
    legalDesc: 'KINH TE CA THE',
    mad1: 'CUC THUE TINH BINH DUONG',
    mar: '2',
    marDesc: 'CO GIA DINH',
    mcntry: 'VN',
    mcntryDesc: 'VIET NAM',
    mcounty: '7499',
    mstate: '74',
    mstateDesc: 'BINH DUONG',
    naics: '2',
    naicsDesc: 'KHONG PHAI DN SME THEO QD CUA CP',
    nam: 'NO KAA WKYIU',
    note: [
      {
        acn: 85082,
        cid: 85082,
        desc: 'PROFILE: NGAY DEN HAN ID:280666006; TYPE',
        lupd: '21/07/2023',
        ntype: '002',
        ntypeDesc: 'BO SUNG CMT CUA KHACH HANG',
        num: 1,
        odate: '21/07/2023',
        ufn: 'CONVERT',
        uid: 'CONVERT',
        zbrcd: 650000,
        zbrcdDesc: 'CN BINH DUONG',
        zdelind: false,
        znsecurity: 3,
      },
    ],
    occ: 'A010',
    occDesc: 'A010_NGHE KHAC',
    oed: '20/07/2029',
    oin: '084069000125',
    oisdt: '08/02/2021',
    oit: 'CIC',
    oitDesc: 'CAN CUOC CONG DAN',
    pad1: 'CUC THUE TINH BINH DUONG',
    pcntry: 'VN',
    pcntryDesc: 'VIET NAM',
    pcounty: '7499',
    pstate: '74',
    pstateDesc: 'BINH DUONG',
    rescd: '1',
    rescdDesc: 'Nguoi cu tru/Resident',
    rescntry: 'VN',
    rescntryDesc: 'VIET NAM',
    sex: 'M',
    sexDesc: 'NAM',
    sictyp: 'RR04',
    sictypDesc: 'KHONG',
    stat: '1',
    statusDesc: 'Active',
    zbca: '1',
    zbcaDesc: 'DA XAC THUC',
    zboa: '650000',
    zboaDesc: 'CN BINH DUONG',
    zbph1: '0944005739',
    zchan: '2',
    zchanDesc: 'WebCSR',
    zchnuid: 'CONVERT',
    zchnuidDesc: 'CONVERT',
    zcstype: 'N',
    zcstypeDesc: 'CA NHAN',
    zekyc: '01',
    zekycDesc: 'KYC',
    zethnic: '55',
    zethnicDesc: 'DAN TOC KHAC',
    zisdesc: 'CCSQLHCVTTXH',
    zpriv: '0',
    zprivDesc: 'UNDEFINED – CHUA XAC DINH',
    zprswlk: false,
    zrcode: '7',
    zrcodeDesc: 'KHONG XAC DINH',
    zsth: '1',
    zsthDesc: 'HOAT DONG',
    zusrel: true,
    zusreltyp: '10003',
    zusreltypDesc: 'C-KO CO DH MY-TUAN THU',
  };

  getFakedStep2Data() {
    return this.fakedStep2Data;
  }

  listIndentifier(param: any) {
    return this.#httpClient
      .setUrl(
        `http://kong-api-aio.apps.uat2ttptnhs.ldapudtest.com/aiot/oauth2/v1/customers/ids`,
      )
      .setBody(param);
  }

  detail(param: { cif: string }) {
    return this.#httpClient
      .setUrl(
        `http://kong-api-aio.apps.uat2ttptnhs.ldapudtest.com/aiot/oauth2/v1/customers/important-info`,
      )
      .setBody(param);
  }
}
