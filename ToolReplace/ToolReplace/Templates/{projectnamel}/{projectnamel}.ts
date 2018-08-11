// ==============================================================================
// FILE-ID          {projectnamel}.SLN
// CODING-DATE      {DateNote}
// REMARKS          {TitleName}
// NOTE
// ==============================================================================

//#region Form01
class Form01{
    // #regionWindowVariables
    //印刷制御
    private sメッセージ１: string = "";
    private sメッセージ２: string = "";
    //制御変数
    private sチェック: string = "";
    private s現在日付: string = "";
    private s現在時間: string = "";
    private s退避行区分: string = "";
    //画面１項目用変数
    private s移動元: string = "";
    private s移動元店: string = "";
    private s移動元名: string = "";
    private s移動元セク: string = "";
    private s移動元セク名: string = "";
    private s移動先: string = "";
    private s移動先店: string = "";
    private s移動先名: string = "";
    private s移動先セク: string = "";
    private s移動先セク名: string = "";
    private s指示日開始: string = "";
    private s指示日終了: string = "";
    private s指示担当者: string = "";
    private s指示担当者名: string = "";
    private s品番: string = "";
    private sサブ１: string = "";
    private s品名: string = "";
    private n処理区分: number = 0;
    private n移動元セクレベル: number = 0;
    private n移動先セクレベル: number = 0;
    private n出力済フラグ: number = 0;
    private s退避品番: string = "";
    private s退避サブ１: string = "";
    private s退避サブ２: string = "";
    private s退避サブ３: string = "";
    private s退避移動元: string = "";
    private s退避移動元店: string = "";
    private s退避移動先: string = "";
    private s退避移動先店: string = "";
    //画面検索パラメータ
    private nパラメータ１: number = 0;
    private s品名２: string = "";
    private s検索タイトル: string = "";
    private s検索プリンタ: string = "";
    private s検索プリンタ名: string = "";
    private s検索場所: string = "";
    private n検索プリンタ使用区分: number = 0;
    private s検索取引先名: string = "";
    private nセク使用区分: number = 0;
    //印刷情報ワーク
    private sタイトル: string = "";
    private s帳票名: string = "";
    private n指数: number = 0;
    private n小数以下桁数: number = 0;
    private n検索行: number = 0;
    private sプリンタコード: string = "";
    private sプリンタ名称: string = "";
    private s設置場所: string = "";

	// REP変数
	private REPs帳票名: string = "";
	private REPi開始頁: number = 0;
	private REPi終了頁: number = 0;
	//#endregion
	//#region constructor
	constructor() {
		let that = FORM = this;
		setMaskVariables();

		/* 検索ウィンドウ読込 */
		//if ($("#tzfc100e").empty()) $("#tzfc100e").load("../../Dialog/tzfc100e/index.html");
		//if ($("#tzfa510e").empty()) $("#tzfa510e").load("../../Dialog/tzfa510e/index.html");

		/* ▼ inputObjSetting 実行 */
		inputObjSetting();
		/* ▼ textTrimmerSetting 実行 */
		textTrimmerSetting();

		//ローカルストレージからSYS取得
		SYS = JSON.parse(window.localStorage.getItem("SYS"));

		this.AM_Create(0);
	}
	//#endregion
    //#region AM_Create
    public async AM_Create(iParam) {
        // 初期画面セット
        //Cursor		=	Cursors.WaitCursor;
        // 帳票初期設定
        //if (rep.ChkRepPath() == false) {
        //Message(35);
        //return false;
        //}
        // 初期設定 修正
        SPL.i用紙種類 = 1;
        //SPL.i伝票種別[0]			=	new int[SPL.i用紙種類];
        SPL.i伝票種別[0] = 888;
        this.REPs帳票名 = SYS.sObjectName;
        this.REPs帳票名 = SYS.sObjectName;
        // 印刷再発行フラグ(0:初回,1:再発行印刷,2:再発行プレビュー,3:再発行ファイル出力)
        //if (SYS.sReprint == "0") {
        SPL.s印刷担当者 = SYS.sTanc;
        SPL.s印刷端末ＩＤ = SYS.sClient;
        this.REPi開始頁 = 1;
        this.REPi終了頁 = 999999999;
        SPL.sプリンタコード[0] = "none";
        SPL.sプリンタ名称[0] = "DUMMY";
        SPL.i複写枚数[0] = 1;
        SPL.i保存フラグ[0] = 1;
        SPL.sプリンタ場所コード[0] = "none";
        // プリンタチェック
        //if (AM_Inz12(0) == false) {
        //return false;
        //}
        //}
        //else {
        //rep.RePrint();
        // Ｒｅｐｏｒｔｅｒ出力
        //this.Visible	=	false;
        //AM_Prt12(0);
        //Cursor	=	Cursors.Default;
        //return false;
        //}
        // システム制御
        if (SYS.i店舗実績管理モジュール == 0) {
            await Message(110);
            //Cursor	=	Cursors.Default;
            return false;
        }
        await this.AM_Set10(0);
        if (await this.AM_Set11(0) == false) {
            //Cursor	=	Cursors.Default;
            return false;
        }
        //Cursor	=	Cursors.Default;
        return true;
    }
	//#endregion
    //#region AM_Set10
    public async AM_Set10(iParam) {
        // 画面項目名システム制御
        //#region if (iParam == 0)
        if (iParam == 0) {
            if (SYS.i店桁数 == 0) {
                $("#tbTPC移動元店").hide();
                $("#tbTPC移動元店").prop("disabled", true);
            }
            if (SYS.i店桁数 == 0) {
                $("#tbTPC移動先店").hide();
                $("#tbTPC移動先店").prop("disabled", true);
            }
            if (SYS.iサブ１使用区分 == 0) {
                $("#tbSB1サブ１").hide();
                $("#tbSB1サブ１").prop("disabled", true);
            }
            $("#lb品番").text(SYS.s品番名称);
        }
        //#endregion
        return true;
    }
    //#endregion
    //#region AM_Set11
    public async AM_Set11(iParam) {
        // 画面制御
        INT.i画面 = 1;
        // 画面初期設定
        if (iParam == 0) {
            ClearPanel("panel1");
            $("#tb指示日開始").Data(SYS.s在庫関連処理日);
            $("#tb指示日終了").Data(SYS.s在庫関連処理日);
            $("#cb処理区分").Text("すべて");
            this.n処理区分 = 0;
        }
        // 画面データフィールド制御
        $("#panel1").Active();
        //panel2.Enabled			=	false;
        //プッシュボタン
        $("#panel1").Active();
        //panel2.Enabled			=	false;
        // フォーカス制御
        //SetFocus(this);
        return true;
    }
    //#endregion
    //#region AM_Chk11
    public async AM_Chk11(iParam, sWndItem?) {
        // 画面１チェック
        INT.iＲＥＴ = 0;
        this.sチェック = "";
        //#region if (SYS.i店桁数 == 0)
        if (SYS.i店桁数 == 0) {
            //#region if (sWndItem == "tbTRC移動元" || iParam == 1)
            if (sWndItem == "tbTRC移動元" || iParam == 1) {
                if ($("#tbTRC移動元").Data() == "") {
                    this.s移動元 = " ";
                }
                else {
                    this.s移動元 = $("#tbTRC移動元").Data();
                }
                this.s移動元店 = " ";
            }
            //#endregion
        }
        else {
            //#region if (sWndItem == "tbTRC移動元" || iParam == 1)
            if (sWndItem == "tbTRC移動元" || iParam == 1) {
                if ($("#tbTRC移動元").Data() == "") {
                    this.s移動元 = " ";
                }
                else {
                    this.s移動元 = $("#tbTRC移動元").Data();
                }
            }
            //#endregion
            //#region if (sWndItem == "tbTPC移動元店" || iParam == 1)
            if (sWndItem == "tbTPC移動元店" || iParam == 1) {
                if ($("#tbTRC移動元").Data() == "") {
                    this.s移動元 = " ";
                    if ($("#tbTPC移動元店").Data() == "") {
                        this.s移動元店 = " ";
                    }
                    else {
                        await Message(11080);
                        $("#tbTPC移動元店").focus();
                        //Cursor	=	Cursors.Default;
                        return false;
                    }
                }
                else {
                    this.s移動元 = $("#tbTRC移動元").Data();
                    if ($("#tbTPC移動元店").Data() == "") {
                        this.s移動元店 = " ";
                    }
                    else {
                        this.s移動元店 = $("#tbTPC移動元店").Data();
                    }
                }
            }
            //#endregion
        }
        //#endregion
        //#region if (sWndItem == "tbSEC移動元セクション" || iParam == 1)
        if (sWndItem == "tbSEC移動元セクション" || iParam == 1) {
            if ($("#tbSEC移動元セクション").Data() == "") {
                this.s移動元セク = " ";
                $("#tbSNM移動元セク名").Data("");
            }
            else {
                this.s移動元セク = $("#tbSEC移動元セクション").Data();
            }
        }
        //#endregion
        //#region if (SYS.i店桁数 == 0)
        if (SYS.i店桁数 == 0) {
            //#region if (sWndItem == "tbTRC移動先" || iParam == 1)
            if (sWndItem == "tbTRC移動先" || iParam == 1) {
                if ($("#tbTRC移動先").Data() == "") {
                    this.s移動先 = " ";
                }
                else {
                    this.s移動先 = $("#tbTRC移動先").Data();
                }
                this.s移動先店 = " ";
            }
            //#endregion
        }
        else {
            //#region if (sWndItem == "tbTRC移動先" || iParam == 1)
            if (sWndItem == "tbTRC移動先" || iParam == 1) {
                if ($("#tbTRC移動先").Data() == "") {
                    this.s移動先 = " ";
                }
                else {
                    this.s移動先 = $("#tbTRC移動先").Data();
                }
            }
            //#endregion
            //#region if (sWndItem == "tbTPC移動先店" || iParam == 1)
            if (sWndItem == "tbTPC移動先店" || iParam == 1) {
                if ($("#tbTRC移動先").Data() == "") {
                    this.s移動先 = " ";
                    if ($("#tbTPC移動先店").Data() == "") {
                        this.s移動先店 = " ";
                    }
                    else {
                        await Message(11080);
                        $("#tbTPC移動先店").focus();
                        //Cursor	=	Cursors.Default;
                        return false;
                    }
                }
                else {
                    this.s移動先 = $("#tbTRC移動先").Data();
                    if ($("#tbTPC移動先店").Data() == "") {
                        this.s移動先店 = " ";
                    }
                    else {
                        this.s移動先店 = $("#tbTPC移動先店").Data();
                    }
                }
            }
            //#endregion
        }
        //#endregion
        //#region if (sWndItem == "tbSEC移動先セクション" || iParam == 1)
        if (sWndItem == "tbSEC移動先セクション" || iParam == 1) {
            if ($("#tbSEC移動先セクション").Data() == "") {
                this.s移動先セク = " ";
                //$("#tbSNM移動先セク名").Data("");
            }
            else {
                this.s移動先セク = $("#tbSEC移動先セクション").Data();
            }
        }
        //#endregion
        //#region if (sWndItem == "tb指示日開始"  ||  iParam == 1)
        if (sWndItem == "tb指示日開始" || iParam == 1) {
            if ($("#tb指示日開始").Data() == "") {
                this.s指示日開始 = "00010101";
            }
            else {
                this.s指示日開始 = $("#tb指示日開始").Data();
            }
        }
        //#endregion
        //#region if (sWndItem == "tb指示日終了" || iParam == 1)
        if (sWndItem == "tb指示日終了" || iParam == 1) {
            if ($("#tb指示日終了").Data() == "") {
                this.s指示日終了 = "00010101";
            }
            else {
                this.s指示日終了 = $("#tb指示日終了").Data();
            }
            if ($("#tb指示日開始").Data() != "" && $("#tb指示日終了").Data() != "") {
                if (StringCompare(this.s指示日開始, this.s指示日終了) > 0) {
                    await Message(51590);
                    $("#tb指示日終了").focus();
                    //Cursor	=	Cursors.Default;
                    return false;
                }
            }
            if ($("#tb指示日終了").Data() == "") {
                this.s指示日終了 = "23991231";
            }
            else {
                this.s指示日終了 = $("#tb指示日終了").Data();
            }
        }
        //#endregion
        //#region if (sWndItem == "tbTAN指示担当者"  ||  iParam == 1)
        if (sWndItem == "tbTAN指示担当者" || iParam == 1) {
            if ($("#tbTAN指示担当者").Data() == "") {
                this.s指示担当者 = " ";
            }
            else {
                this.s指示担当者 = $("#tbTAN指示担当者").Data();
            }
        }
        //#endregion
        //#region if (sWndItem == "tbMHN品番" || iParam == 1)
        if (sWndItem == "tbMHN品番" || iParam == 1) {
            if ($("#tbMHN品番").Data() == "") {
                this.s品番 = " ";
            }
            else {
                this.s品番 = $("#tbMHN品番").Data();
            }
            if (SYS.iサブ１使用区分 == 0) {
                this.sサブ１ = " ";
            }
        }
        //#endregion
        //#region if (sWndItem == "tbSB1サブ１" || iParam == 1)
        if (sWndItem == "tbSB1サブ１" || iParam == 1) {
            if ($("#tbSB1サブ１").Data() == "") {
                this.sサブ１ = " ";
            }
            else {
                this.sサブ１ = $("#tbSB1サブ１").Data();
            }
        }
        //#endregion
        //#region if (sWndItem == "cb処理区分" || iParam == 1)
        if (sWndItem == "cb処理区分" || iParam == 1) {
            // 「すべて」選択時
            if ($("#cb処理区分").Text() == "すべて") {
                this.n処理区分 = 0;
            }
            // 「店舗間移動」選択時
            else if ($("#cb処理区分").Text() == "店舗間移動") {
                this.n処理区分 = 1;
            }
            // 「物流戻り」選択時
            else if ($("#cb処理区分").Text() == "物流戻り") {
                this.n処理区分 = 2;
            }
            // 「仕入返品」選択時
            else if ($("#cb処理区分").Text() == "仕入返品") {
                this.n処理区分 = 3;
            }
        }
        //#endregion
        //#region if (iParam == 1)
        if (iParam == 1) {
            this.sチェック = "ＡＬＬ";
        }
        //#endregion

        // =============
        // 全体チェック
        // =============
        //#region if (this.sチェック == "ＡＬＬ")
        if (this.sチェック == "ＡＬＬ") {
            this.s移動元名 = "";
            this.s移動先名 = "";
            this.s指示担当者名 = "";
            this.s品名 = "";
            INT.iＲＥＴ = 59780;
            // ＳＰ実行
            try {
                const data = await ExecuteSQL("NFG400C110",
                    SYS.sCorporation, this.sチェック, this.s移動元セク,
                    this.s移動元, this.s移動元店, this.s移動先セク,
                    this.s移動先, this.s移動先店, this.s指示日開始,
                    this.s指示日終了, this.s指示担当者, this.s品番,
                    this.sサブ１, this.n処理区分, this.s移動元名,
                    this.s移動先名, this.s移動元セク名, this.s移動先セク名,
                    this.n移動元セクレベル, this.n移動先セクレベル, this.s指示担当者名,
                    this.s品名, SYS.s管理コード初期値, INT.iＥＲＲ,
                    INT.iＲＥＴ);
                //OUT値セット
                this.sチェック = data["Ｐ＿チェック"];
                this.s移動元名 = data["Ｐ＿移動元名"];
                this.s移動先名 = data["Ｐ＿移動先名"];
                this.s移動元セク名 = data["Ｐ＿移動元セク名"];
                this.s移動先セク名 = data["Ｐ＿移動先セク名"];
                this.n移動元セクレベル = data["Ｐ＿移動元セクレベル"];
                this.n移動先セクレベル = data["Ｐ＿移動先セクレベル"];
                this.s指示担当者名 = data["Ｐ＿指示担当者名"];
                this.s品名 = data["Ｐ＿品名"];
                INT.iＥＲＲ = data["Ｐ＿ＥＲＲ"];
                INT.iＲＥＴ = data["Ｐ＿ＲＥＴ"];
            }
            catch (e) {
                await Message2(e.Message, "NFG400C110", MB.BUTTON.OK, MB.ICON.Critical);
                //Cursor	=	Cursors.Default;
                return false;
            }
            if (INT.iＲＥＴ != 0) {
                await Message(INT.iＲＥＴ);
                //Cursor	=	Cursors.Default;
            }
            //#region this.switch (INT.iＲＥＴ)
            switch (INT.iＲＥＴ) {
                case 0:
                    break;
                case 34590:
                    if (INT.iＥＲＲ == 1) {
                        $("#tbTRC移動元").focus();
                        return false;
                    }
                    else {
                        $("#tbTRC移動先").focus();
                        return false;
                    }
                case 34850:
                    $("#tbMHN品番").focus();
                    return false;
                case 34900:
                    if (INT.iＥＲＲ == 1) {
                        $("#tbSEC移動元セクション").focus();
                    }
                    else {
                        $("#tbSEC移動先セクション").focus();
                    }
                    return false;
                case 35740:
                    if (INT.iＥＲＲ == 1) {
                        $("#tb指示日開始").focus();
                        return false;
                    }
                    else {
                        $("#tb指示日終了").focus();
                        return false;
                    }
                case 35340:
                case 76562:
                    $("#tbTAN指示担当者").focus();
                    return false;
                case 38450:
                default:
                    //SetFocus(this);
                    return false;
            }
            //#endregion
            //#region if (INT.iＲＥＴ == 0)
            if (INT.iＲＥＴ == 0) {
                if (this.sチェック == "ＡＬＬ") {
                    //$("#tbRPR移動元名").Data(this.s移動元名);
                    //$("#tbRPR移動先名").Data(this.s移動先名);
                    //$("#tbTNM担当者名").Data(this.s指示担当者名);
                    //$("#tbHN1品名").Data(this.s品名);
                    //$("#tbSNM移動元セク名").Data(this.s移動元セク名);
                    //$("#tbSNM移動先セク名").Data(this.s移動先セク名);
                }
            }
            //#endregion
        }
        //#endregion
        return true;
    }
    //#endregion
    //#region AM_Upd12
    public async AM_Upd12(iParam) {
        //Cursor				=	Cursors.WaitCursor;
        // 処理中メッセージ
        INT.iＲＥＴ = 0;
        //sタイトル						=	SYS.sObjectName;
        //sメッセージ１				=	StrRPad(SYS.sObjectName + " 作成中", 62, " ");
        //sメッセージ２				=	"        しばらくお待ち下さい...";
        //FORMWait	frmWait	=	new FORMWait(this,sタイトル,sメッセージ１,sメッセージ２);
        //frmWait.Show();
        //frmWait.Refresh();
        //this.Enabled = false;
        // プリンタ関係更新（帳票印刷のときのみ）
        //if (REP.i出力先区分 == 0) {
        //if (SPL_UpdPrt(ref INT.iＥＲＲ行) == false) {
        //frmWait.Dispose();
        //SetFocusCell(this.tbl1, INT.iＥＲＲ行, "colプリンタコード");
        //Cursor	=	Cursors.Default;
        //return false;
        //}
        //}
        INT.iＲＥＴ = 59780;
        // スプール番号取得
        if (await SPL_GetNumber() == false) {
            //hウェイト.Dispose();
            //SetFocus(this);
            return false;
        }
        INT.iＲＥＴ = 59780;
        // ＳＰ実行
        try {
            const data = await ExecuteSQL("NFG400T110",
                SYS.sCorporation, SYS.sCorpoName, this.s移動元セク,
                this.s移動元, this.s移動元店, this.n移動元セクレベル,
                this.s移動先セク, this.s移動先, this.s移動先店,
                this.n移動先セクレベル, this.s指示日開始, this.s指示日終了,
                this.s指示担当者, this.s品番, this.sサブ１,
                this.n処理区分, SPL.s印刷担当者, SPL.s印刷端末ＩＤ,
                SYS.sObject, SPL.iスプール番号, SPL.i伝票種別[0],
                SPL.sプリンタコード[0], SPL.sプリンタ名称[0], this.REPs帳票名,
                SPL.i複写枚数[0], SPL.i保存フラグ[0], SPL.sプリンタ場所コード[0],
                this.REPi終了頁, SYS.s管理コード初期値, INT.iＲＥＴ);
            //OUT値セット
            this.REPi終了頁 = data["Ｐ＿ページ"];
            this.s現在日付 = data["Ｐ＿作成日付"];
            this.s現在時間 = data["Ｐ＿作成時間"];
            INT.iＲＥＴ = data["Ｐ＿ＲＥＴ"];
        }
        catch (e) {
            await Message2(e.Message, "NFG400T110", MB.BUTTON.OK, MB.ICON.Critical);
            //frmWait.Dispose();
            //Cursor	=	Cursors.Default;
            return false;
        }
        //frmWait.Dispose();
        //#region this.switch (INT.iＲＥＴ)
        switch (INT.iＲＥＴ) {
            case 0:
                break;
            case 38450:
            case 36690:
            case 59760:
            default:
                await Message(INT.iＲＥＴ);
                //SetFocus(this);
                //Cursor	=	Cursors.Default;
                return false;
        }

        //#endregion
        if (INT.iＲＥＴ != 0) {
            await Message(INT.iＲＥＴ);
            return false;
        } else {
            await ExecutePrintPDF("pfg400l");
        }
        return true;
    }
    //#endregion
    //#region AM_PushPb1
    public async AM_PushPb1(iParam, sWndItem?) {
        //Cursor	=	Cursors.WaitCursor;
        //#region if (sWndItem == "tbTRC移動元")
        if (sWndItem == "tbTRC移動元") {
            this.s移動元セク = $("#tbSEC移動元セクション").Data();
            this.s移動元 = $("#tbTRC移動元").Data();
            this.s移動元店 = $("#tbTPC移動元店").Data();
            this.nパラメータ１ = 1;
            $("#contents").showtzfg100e({
                s移動元セク: this.s移動元セク,
                s移動元: this.s移動元,
                s移動元店: this.s移動元店,
                s移動元名: this.s移動元名,
                //SYS.s売上関連処理日: SYS.s売上関連処理日,
                nパラメータ１: this.nパラメータ１
            }).done(function (tzfg100e) {
                //nzfg100e.nzfg100e_return	nzfg100	=	dlg.nzfg100e_param;
                $("#tbTRC移動元").Data(tzfg100e.店舗);
                $("#tbTPC移動元店").Data(tzfg100e.店);
                //$("#tbRPR移動元名").Data(tzfg100e.店舗名);
                $("#tbSEC移動元セクション").Data(tzfg100e.セクション);
                $("#tbSNM移動元セク名").Data(tzfg100e.セクション名);
                this.s移動元 = $("#tbTRC移動元").Data();
                this.s移動元店 = $("#tbTPC移動元店").Data();
                this.s移動元セク = $("#tbSEC移動元セクション").Data();
            }
				//dlg.Dispose();
				,$("#tbTRC移動元").focus());
        }
        //#endregion
        //#region if (sWndItem == "tbTPC移動元店")
        if (sWndItem == "tbTPC移動元店") {
            this.s移動元セク = $("#tbSEC移動元セクション").Data();
            this.s移動元 = $("#tbTRC移動元").Data();
            this.s移動元店 = $("#tbTPC移動元店").Data();
            this.nパラメータ１ = 2;
            $("#contents").showtzfg100e({
                s移動元セク: this.s移動元セク,
                s移動元: this.s移動元,
                s移動元店: this.s移動元店,
                s移動元名: this.s移動元名,
                //SYS.s売上関連処理日: SYS.s売上関連処理日,
                nパラメータ１: this.nパラメータ１
            }).done(function (tzfg100e) {
                //nzfg100e.nzfg100e_return	nzfg100	=	dlg.nzfg100e_param;
                $("#tbTRC移動元").Data(tzfg100e.店舗);
                $("#tbTPC移動元店").Data(tzfg100e.店);
                //$("#tbRPR移動元名").Data(tzfg100e.店舗名);
                $("#tbSEC移動元セクション").Data(tzfg100e.セクション);
                $("#tbSNM移動元セク名").Data(tzfg100e.セクション名);
                this.s移動元 = $("#tbTRC移動元").Data();
                this.s移動元店 = $("#tbTPC移動元店").Data();
                this.s移動元セク = $("#tbSEC移動元セクション").Data();
            }
				//dlg.Dispose();
				,$("#tbTPC移動元店").focus());
        }
        //#endregion
        //#region if (sWndItem == "tbSEC移動元セクション")
        if (sWndItem == "tbSEC移動元セクション") {
            this.s移動元セク = $("#tbSEC移動元セクション").Data();
            // 上位セクション可のため 使用区分 0:すべて を使用
            this.nセク使用区分 = 0;
            $("#contents").showtzcc110e({
                s移動元セク: this.s移動元セク,
                s移動元セク名: this.s移動元セク名,
                nセク使用区分: this.nセク使用区分
            }).done(function (tzcc110e) {
                //nzcc110e.nzcc110e_return	nzcc110	=	dlg.nzcc110e_param;
                $("#tbSEC移動元セクション").Data(tzcc110e.セクション);
                $("#tbSNM移動元セク名").Data(tzcc110e.セクション名);
            }
				//dlg.Dispose();
				,$("#tbSEC移動元セクション").focus());
        }
        //#endregion
        //#region if (sWndItem == "tbTRC移動先")
        if (sWndItem == "tbTRC移動先") {
            this.s移動先セク = $("#tbSEC移動先セクション").Data();
            this.s移動先 = $("#tbTRC移動先").Data();
            this.s移動先店 = $("#tbTPC移動先店").Data();
            this.nパラメータ１ = 1;
            $("#contents").showtzfg110e({
                s移動先セク: this.s移動先セク,
                //string.Empty: string.Empty,
                s移動先: this.s移動先,
                s移動先店: this.s移動先店,
                s移動先名: this.s移動先名,
                //SYS.s売上関連処理日: SYS.s売上関連処理日,
                nパラメータ１: this.nパラメータ１
            }).done(function (tzfg110e) {
                //nzfg110e.nzfg110e_return	nzfg110	=	dlg.nzfg110e_param;
                $("#tbTRC移動先").Data(tzfg110e.取引先);
                $("#tbTPC移動先店").Data(tzfg110e.店);
                //$("#tbRPR移動先名").Data(tzfg110e.取引先店略名);
                $("#tbSEC移動先セクション").Data(tzfg110e.セクション);
                //$("#tbSNM移動先セク名").Data(tzfg110e.セクション名);
                this.s移動先 = $("#tbTRC移動先").Data();
                this.s移動先店 = $("#tbTPC移動先店").Data();
                this.s移動先セク = $("#tbSEC移動先セクション").Data();
            }
				//dlg.Dispose();
				,$("#tbTRC移動先").focus());
        }
        //#endregion
        //#region if (sWndItem == "tbTPC移動先店")
        if (sWndItem == "tbTPC移動先店") {
            this.s移動先セク = $("#tbSEC移動先セクション").Data();
            this.s移動先 = $("#tbTRC移動先").Data();
            this.s移動先店 = $("#tbTPC移動先店").Data();
            this.nパラメータ１ = 2;
            $("#contents").showtzfg110e({
                s移動先セク: this.s移動先セク,
                //string.Empty: string.Empty,
                s移動先: this.s移動先,
                s移動先店: this.s移動先店,
                s移動先名: this.s移動先名,
                //SYS.s売上関連処理日: SYS.s売上関連処理日,
                nパラメータ１: this.nパラメータ１
            }).done(function (tzfg110e) {
                //nzfg110e.nzfg110e_return	nzfg110	=	dlg.nzfg110e_param;
                $("#tbTRC移動先").Data(tzfg110e.取引先);
                $("#tbTPC移動先店").Data(tzfg110e.店);
                //$("#tbRPR移動先名").Data(tzfg110e.取引先店略名);
                $("#tbSEC移動先セクション").Data(tzfg110e.セクション);
                //$("#tbSNM移動先セク名").Data(tzfg110e.セクション名);
                this.s移動先 = $("#tbTRC移動先").Data();
                this.s移動先店 = $("#tbTPC移動先店").Data();
                this.s移動先セク = $("#tbSEC移動先セクション").Data();
            }
				//dlg.Dispose();
				,$("#tbTPC移動先店").focus());
        }
        //#endregion
        //#region if (sWndItem == "tbSEC移動先セクション")
        if (sWndItem == "tbSEC移動先セクション") {
            this.s移動先セク = $("#tbSEC移動先セクション").Data();
            // 上位セクション可のため 使用区分 0:すべて を使用
            this.nセク使用区分 = 0;
            $("#contents").showtzcc110e({
                s移動先セク: this.s移動先セク,
                s移動先セク名: this.s移動先セク名,
                nセク使用区分: this.nセク使用区分
            }).done(function (tzcc110e) {
                //nzcc110e.nzcc110e_return	nzcc110	=	dlg.nzcc110e_param;
                $("#tbSEC移動先セクション").Data(tzcc110e.セクション);
                //$("#tbSNM移動先セク名").Data(tzcc110e.セクション名);
            }
				//dlg.Dispose();
				,$("#tbSEC移動先セクション").focus());
        }
        //#endregion
        //#region if (sWndItem == "tbTAN指示担当者")
        if (sWndItem == "tbTAN指示担当者") {
            this.s指示担当者 = $("#tbTAN指示担当者").Data();
            this.s指示担当者名 = " ";
            $("#contents").showtzcc120e({
                s指示担当者: this.s指示担当者,
                s指示担当者名: this.s指示担当者名
            }).done(function (tzcc120e) {
                //nzcc120e.nzcc120e_return	nzcc120	=	dlg.nzcc120e_param;
                $("#tbTAN指示担当者").Data(tzcc120e.担当者);
                //$("#tbTNM担当者名").Data(tzcc120e.担当者名);
            }
				//dlg.Dispose();
				,$("#tbTAN指示担当者").focus());
        }
        //#endregion
        //#region if (sWndItem == "tbMHN品番")
        if (sWndItem == "tbMHN品番") {
            this.s品番 = $("#tbMHN品番").Data();
            this.nパラメータ１ = 14;
            if ($("#tbSB1サブ１").Data() == "") {
                this.sサブ１ = " ";
            }
            else {
                this.sサブ１ = $("#tbSB1サブ１").Data();
            }
            $("#contents").showtzce110e({
                s品番: this.s品番,
                sサブ１: this.sサブ１,
                s品名: this.s品名,
                s品名２: this.s品名２,
                //SYS.s品番名称: SYS.s品番名称,
                //SYS.sサブ１名称: SYS.sサブ１名称,
                //SYS.s品名１名称: SYS.s品名１名称,
                //SYS.s品名２名称: SYS.s品名２名称,
                nパラメータ１: this.nパラメータ１
            }).done(function (tzce110e) {
                //nzce110e.nzce110e_return	nzce110	=	dlg.nzce110e_param;
                $("#tbMHN品番").Data(tzce110e.品番);
                $("#tbSB1サブ１").Data(tzce110e.サブ１);
                //$("#tbHN1品名").Data(tzce110e.品名１);
            }
				//dlg.Dispose();
				,$("#tbMHN品番").focus());
        }
        //#endregion
        //Cursor	=	Cursors.Default;
        return true;
    }
    //#endregion
    //#region AM_PushPb5
    public async AM_PushPb5(iParam) {
        //Cursor	=	Cursors.WaitCursor;
        //if (INT.i画面 == 1) {
            await this.AM_Set11(0);
        //}
        //else if (INT.i画面 == 2) {
        //    //AM_Inz12(0);
        //    await this.AM_Set12(0);
        //}
        //Cursor	=	Cursors.Default;
        return true;
    }
    //#endregion
    //#region AM_PushPb9
    public async AM_PushPb9(iParam) {
        //  更新
        if (await this.AM_Chk11(1, "ALL") == false) {
            return false;
        } else {
            if (await ShowDialog("PDFを作成します。\n確認してください。") == DialogResult.OK) {
                if (await this.AM_Upd12(0) == true) {
                    this.AM_Set11(1);
                    return true;
                } else {
                    if (INT.iＲＥＴ == 9500) {
                        // エラーの時panel1に戻る
                        this.AM_Set11(1);
                    } else {
                        //$("#tb棚卸日付").focus();
                    }
                }
            }
        }
        return false;

        ////Cursor	=	Cursors.WaitCursor;
        //if (await this.AM_Chk12(1) == false) {
        //    //Cursor	=	Cursors.Default;
        //    return false;
        //}
        //else {
        //    REP.i出力先区分 = 0;
        //    //sメッセージ１						=	"入力を確認してください";
        //    DLGConfirm	hメッセージ = new DLGConfirm(this, sメッセージ１);
        //    //Cursor									=	Cursors.Default;
        //    if (hメッセージ.ShowDialog(this) == DialogResult.OK) {
        //        //hメッセージ.Dispose();
        //        if (await this.AM_Upd12(0) == true) {
        //            await this.AM_Prt12(1);
        //            this.Enabled = true;
        //            await this.AM_Set11(1);
        //            //AM_Inz12(0);
        //            //Cursor	=	Cursors.Default;
        //            return true;
        //        }
        //        else {
        //            this.Enabled = true;
        //            //SetFocus(this);
        //            //Cursor	=	Cursors.Default;
        //            return true;
        //        }
        //    }
        //    else {
        //        //hメッセージ.Dispose();
        //        //SetFocus(this);
        //        //Cursor	=	Cursors.Default;
        //        return true;
        //    }
        //}
    }
    //#endregion
}
//#endregion

//#region load
window.onload = async () => {
	//ヘッダー読込
	$("#header").load("../../CommonFile/html/header.html");
	//フッター読込
	$("#footer").load("../../CommonFile/html/footer.html");
	//SYS変数取得(一時的措置)
	await login();
	//
	new Form01();
};
//#endregion
