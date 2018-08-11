// ==============================================================================
// FILE-ID        {ProjectName}.SLN
// CODING-DATE    {DateNote}
// REMARKS        {TitleName}
// NOTE
// ==============================================================================

//#region Form01
class Form01 {
	//#regionWindowVariables
	private tbl1;
	//制御変数
	private sタイトル: string = "";
	private sメッセージ１: string = "";
	private sメッセージ２: string = "";
	//制御変数
	private sチェック: string = "";
	private nＳＰ最終実行フラグ: number = 0;
	//連結変数
	private sＴ指示番号: string[];
	private sＴ指示行番号: string[];
	private sＴ元更新番号: string[];
	private sＴ行: string[];
	//画面１、２項目用変数
	private n表示区分: number = 0;
	private s品番: string = "";
	private sサブ１: string = "";
	private sサブ２: string = "";
	private sサブ３: string = "";
	private sサブ名: string = "";
	private s品名１: string = "";
	private s品名２: string = "";
	private s移動元セク: string = "";
	private s移動元セク名: string = "";
	private s移動元: string = "";
	private s移動元店: string = "";
	private s移動元名: string = "";
	private s移動先セク: string = "";
	private s移動先セク名: string = "";
	private s移動先: string = "";
	private s移動先店: string = "";
	private s移動先名: string = "";
	private s担当者: string = "";
	private s担当者名: string = "";
	private s指示日: string = "";
	private n開始指示番号: number = 0;
	private n終了指示番号: number = 0;
	private n処理区分: number = 0;
	private n表示順: number = 0;
	private n移動元セクレベル: number = 0;
	private n移動先セクレベル: number = 0;
	//画面３項目用変数
	private n入力チェック: number = 0;
	private n存在フラグ: number = 0;
	private n表示行: number = 0;
	private nセク使用区分: number = 0;
	private n更新番号: number = 0;
	//検索用変数
	private nパラメータ１: number = 0;
	//#endregion
	//#region constructor
	constructor() {
		let that = FORM = this;
		setMaskVariables();
		this.loadtbl1(true);

		/* 検索ウィンドウ読込 */
		if ($("#tzcc110e").empty()) $("#tzcc110e").load("../../Dialog/tzcc110e/index.html");
		if ($("#tzznoh01").empty()) $("#tzznoh01").load("../../Dialog/tzznoh01/index.html");
		if ($("#tzce110e").empty()) $("#tzce110e").load("../../Dialog/tzce110e/index.html");
		if ($("#tzfg100e").empty()) $("#tzfg100e").load("../../Dialog/tzfg100e/index.html");
		if ($("#tzfg110e").empty()) $("#tzfg110e").load("../../Dialog/tzfg110e/index.html");

		/* ▼ inputObjSetting 実行 */
		inputObjSetting();
		/* ▼ textTrimmerSetting 実行 */
		textTrimmerSetting();

		//ローカルストレージからSYS取得
		SYS = JSON.parse(window.localStorage.getItem("SYS"));

		this.AM_Create(0);
	}
	//#endregion
	//#region loadtbl1
	private loadtbl1(editable: boolean) {
		const dataModel = Array.apply(null, Array(30)).map(function () { return {}; });
		const obj: any = { gridName: "tbl1", gridMode: "hlnTbl", enableRows: 30, width: 1200, height: 365, showTitle: false, collapsible: false, showBottom: false, freezeCols: 1, freezeRows: 0, numberCell: { title: "#" }, stripeRows: false, editable: editable, selectionModel: { type: 'row', mode: 'range', all: true } };
		obj.dataModel = { data: dataModel };
		obj.scrollModel = { autoFit: false };

		obj.colModel = [
			{ dataIndx: "col選択", title: "選択", width: 40, dataType: "integer", maxLen: 1 },
			{
				dataIndx: "col指示番号", title: "指示番号", width: 90, dataType: "integer", maxLen: 9, align: "right", editable: false,
				render: function (ui) { return renderingNumberCell(ui, true); }
			},
			{ dataIndx: "col指示行番号", title: "行番号", width: 60, dataType: "integer", maxLen: 5, align: "right", editable: false },
			{ dataIndx: "col処理区分", title: "処理区分", width: 80, dataType: "integer", maxLen: 1, align: "right", hidden: true, editable: false },
			{ dataIndx: "col処理区分名", title: "処理区分", width: 100, dataType: "string", maxLen: 10, editable: false },
			{ dataIndx: "col指示担当者", title: "指示担当者", style: "TAN", width: SYS.i担当者桁数 * 10, dataType: "string", maxLen: SYS.i担当者桁数, hidden: true, editable: false },
			{ dataIndx: "col指示担当者名", title: "担当者名", style: "TNM", width: SYS.i担当者名桁数 * 10, dataType: "string", maxLen: SYS.i担当者名桁数, editable: false },
			{ dataIndx: "col指示日", title: "指示日", width: 100, dataType: "date", maxLen: 10, editable: false, render: function (ui) { return TblSetMask(ui.cellData, "date", SYS.sDateMask); } },
			{ dataIndx: "col数量小数以下桁数", title: "数量小数以下桁数", width: 160, dataType: "integer", maxLen: 1, align: "right", hidden: true, editable: false },
			{
				dataIndx: "col品番", title: "品番", style: "MHN", width: SYS.i品番マスク付数 * 10, dataType: "string", maxLen: SYS.i品番マスク付数, editable: false, maskLen: sepMHN.length,
				render: function (ui) { return TblSetMask(ui.cellData, sepMHN, mskMHN); }
			},
			{ dataIndx: "colサブ１", title: "サブ１", style: "SB1", width: SYS.iサブ１桁数 * 10, dataType: "string", maxLen: SYS.iサブ１桁数, editable: false },
			{ dataIndx: "colサブ２", title: "サブ２", style: "SB2", width: SYS.iサブ２桁数 * 10, dataType: "string", maxLen: SYS.iサブ２桁数, editable: false },
			{ dataIndx: "colサブ３", title: "サブ３", style: "SB3", width: SYS.iサブ３桁数 * 10, dataType: "string", maxLen: SYS.iサブ３桁数, editable: false },
			{ dataIndx: "colサブ名", title: "サブ名", width: 150, dataType: "string", maxLen: 15, editable: false },
			{ dataIndx: "col品名１", title: "品名１", style: "HN1", width: SYS.i品名１桁数 * 10, dataType: "string", maxLen: SYS.i品名１桁数, editable: false },
			{
				dataIndx: "col指示数", title: "指示数", style: "SUR", width: 70, dataType: "float", maxLen: 7, dbp: 3, align: "right", editable: false,
				render: function (ui) { return renderingNumberCell(ui, false, 3); }
			},
			{ dataIndx: "col移動元", title: "移動元", style: "TRC", width: SYS.i取引先桁数 * 10, dataType: "string", maxLen: SYS.i取引先桁数, editable: false },
			{ dataIndx: "col移動元店", title: "移動元店", style: "TPC", width: SYS.i店桁数 * 10, dataType: "string", maxLen: SYS.i店桁数, editable: false },
			{ dataIndx: "col移動元名", title: "移動元名", style: "RPR", width: SYS.i取引先店略名桁数 * 10, dataType: "string", maxLen: SYS.i取引先店略名桁数, editable: false },
			{ dataIndx: "col移動元セク", title: "移動元ｾｸｼｮﾝ", style: "SEC", width: SYS.iセクション桁数 * 10, dataType: "string", maxLen: SYS.iセクション桁数, editable: false },
			{ dataIndx: "col移動先", title: "移動先", style: "TRC", width: SYS.i取引先桁数 * 10, dataType: "string", maxLen: SYS.i取引先桁数, editable: false },
			{ dataIndx: "col移動先店", title: "移動先店", style: "TPC", width: SYS.i店桁数 * 10, dataType: "string", maxLen: SYS.i店桁数, editable: false },
			{ dataIndx: "col移動先名", title: "移動先名", style: "RPR", width: SYS.i取引先店略名桁数 * 10, dataType: "string", maxLen: SYS.i取引先店略名桁数, editable: false },
			{ dataIndx: "col移動先セク", title: "移動先ｾｸｼｮﾝ", style: "SEC", width: SYS.iセクション桁数 * 10, dataType: "string", maxLen: SYS.iセクション桁数, editable: false },
			{ dataIndx: "col元更新番号", title: "元更新番号", width: 180, dataType: "integer", maxLen: 18, align: "right", hidden: true, editable: false },
			{ dataIndx: "col表示順サブ１", title: "表示順サブ１", width: 120, dataType: "integer", maxLen: 3, align: "right", hidden: true, editable: false },
			{ dataIndx: "col表示順サブ２３", title: "表示順サブ２３", width: 140, dataType: "integer", maxLen: 5, align: "right", hidden: true, editable: false }
		];

		obj.toolbar = {
			items: [
				//    { type: 'button', label: '行追加', listeners: [{ click: function (evt, ui) { InsertRow(FORM.tbl1, 1); } }], icon: 'ui-icon-plus' },
				//    { type: 'button', label: '行拡張', listeners: [{ click: function (evt, ui) { InsertRow(FORM.tbl1, 5); } }], icon: 'ui-icon-newwin' },
				//    {
				//        type: 'button', label: '行複写', listeners: [{
				//            click: function (evt, ui) {
				//                var copy_rows = CopyRow(FORM.tbl1);
				//                if (copy_rows == null) return;
				//                for (var i = 0, len = copy_rows.length; i < len; i++) {
				//                    TblSetData(FORM.tbl1, "col更新番号", null, copy_rows[i]);
				//                }
				//                SetFocusCell(FORM.tbl1, copy_rows[0]);
				//            }
				//        }], icon: 'ui-icon-copy'
				//    },
				//    { type: 'separator' },
				//    { type: 'button', label: '行削除', listeners: [{ click: function (evt, ui) { DeleteRange(FORM.tbl1); } }], icon: 'ui-icon-trash' },
				//    { type: 'separator' },
				{ type: 'button', label: 'Excel出力', listeners: [{ click: function (evt, ui) { OutputExcel(FORM.tbl1); } }], icon: 'ui-icon-print' },
			]
		};
		this.tbl1 = $("#tbl1").removeData().hlnGrid(obj);
		this.tbl1.hlnGrid("refresh");
	}
	//#endregion
	//#region AM_Create
	public async AM_Create(iParam) {
		//Cursor	=	Cursors.WaitCursor;
		if (SYS.i店舗実績管理モジュール == 0) {
			await Message(110);
			return false;
		}
		// ワークファイル削除
		DltMyData("ＴＦＧ１１０ＷＦ");
		await this.AM_Set10(0);
		await this.AM_Set11(0);
		//Cursor	=	Cursors.Default;
		return true;
	}
	//#endregion
	//#region AM_Set10
	public async AM_Set10(iParam) {
		if (iParam == 0) {
			$("#lb品番").text(SYS.s品番名称);
			$("#lbサブ２").text(SYS.sサブ２名称);
			$("#lbサブ３").text(SYS.sサブ３名称);
			if (SYS.iサブ名表示区分 == 1) {
				this.sサブ名 = "";
				if (SYS.iサブ１使用区分 == 1) {
					this.sサブ名 = SYS.sサブ１名称;
				}
				if (SYS.iサブ２使用区分 == 1) {
					if (this.sサブ名 != "") {
						this.sサブ名 = this.sサブ名 + "・";
					}
					this.sサブ名 = this.sサブ名 + SYS.sサブ２名称;
				}
				if (SYS.iサブ３使用区分 == 1) {
					if (this.sサブ名 != "") {
						this.sサブ名 = this.sサブ名 + "・";
					}
					this.sサブ名 = this.sサブ名 + SYS.sサブ３名称;
				}
			}
			TblSetColumn(this.tbl1, "col品番", "Caption", SYS.s品番名称);
			TblSetColumn(this.tbl1, "colサブ１", "Caption", SYS.sサブ１名称);
			TblSetColumn(this.tbl1, "colサブ２", "Caption", SYS.sサブ２名称);
			TblSetColumn(this.tbl1, "colサブ３", "Caption", SYS.sサブ３名称);
			TblSetColumn(this.tbl1, "colサブ名", "Caption", this.sサブ名);
			TblSetColumn(this.tbl1, "col品名１", "Caption", SYS.s品名１名称);
			switch (SYS.iサブ１使用区分) {
				case 0:
					$("#tbSB1サブ１").hide();
					$("#tbSB1サブ１").prop("disabled", true);
					TblSetColumn(this.tbl1, "colサブ１", "Visible", false);
					break;
				case 1:
					$("#tbSB1サブ１").show();
					$("#tbSB1サブ１").prop("disabled", false);
					TblSetColumn(this.tbl1, "colサブ１", "Visible", true);
					break;
			}
			switch (SYS.iサブ２使用区分) {
				case 0:
					$("#lbサブ２").hide();
					$("#bt検索サブ２").hide();
					$("#bt検索サブ２").prop("disabled", true);
					$("#tbSB2サブ２").hide();
					$("#tbSB2サブ２").prop("disabled", true);
					TblSetColumn(this.tbl1, "colサブ２", "Visible", false);
					break;
				case 1:
					$("#lbサブ２").show();
					$("#bt検索サブ２").show();
					$("#bt検索サブ２").prop("disabled", false);
					$("#tbSB2サブ２").show();
					$("#tbSB2サブ２").prop("disabled", false);
					TblSetColumn(this.tbl1, "colサブ２", "Visible", true);
					break;
			}
			switch (SYS.iサブ３使用区分) {
				case 0:
					$("#lbサブ３").hide();
					$("#bt検索サブ３").hide();
					$("#bt検索サブ３").prop("disabled", true);
					$("#tbSB3サブ３").hide();
					$("#tbSB3サブ３").prop("disabled", true);
					TblSetColumn(this.tbl1, "colサブ３", "Visible", false);
					break;
				case 1:
					$("#lbサブ３").show();
					$("#bt検索サブ３").show();
					$("#bt検索サブ３").prop("disabled", false);
					$("#tbSB3サブ３").show();
					$("#tbSB3サブ３").prop("disabled", false);
					TblSetColumn(this.tbl1, "colサブ３", "Visible", true);
					break;
			}
			if (SYS.iサブ名表示区分 == 0) {
				TblSetColumn(this.tbl1, "colサブ名", "Visible", false);
			}
		}
		if (iParam == 2) {
			// 移動元・移動先を表示する
			if (this.n表示区分 == 0) {
				TblSetColumn(this.tbl1, "col指示行番号", "Visible", true);
				TblSetColumn(this.tbl1, "col移動元セク", "Visible", true);
				TblSetColumn(this.tbl1, "col移動先セク", "Visible", true);
				TblSetColumn(this.tbl1, "col移動元", "Visible", true);
				TblSetColumn(this.tbl1, "col移動元店", "Visible", true);
				TblSetColumn(this.tbl1, "col移動元名", "Visible", true);
				TblSetColumn(this.tbl1, "col移動先", "Visible", true);
				TblSetColumn(this.tbl1, "col移動先店", "Visible", true);
				TblSetColumn(this.tbl1, "col移動先名", "Visible", true);
			}
			// 移動元・移動先を表示しない
			if (this.n表示区分 == 1) {
				TblSetColumn(this.tbl1, "col指示行番号", "Visible", false);
				TblSetColumn(this.tbl1, "col移動元セク", "Visible", false);
				TblSetColumn(this.tbl1, "col移動先セク", "Visible", false);
				TblSetColumn(this.tbl1, "col移動元", "Visible", false);
				TblSetColumn(this.tbl1, "col移動元店", "Visible", false);
				TblSetColumn(this.tbl1, "col移動元名", "Visible", false);
				TblSetColumn(this.tbl1, "col移動先", "Visible", false);
				TblSetColumn(this.tbl1, "col移動先店", "Visible", false);
				TblSetColumn(this.tbl1, "col移動先名", "Visible", false);
			}
		}
		// テーブルの列幅をCaptionの幅に合わせる
		//TblSetColLen(this.tbl1);
		// ヘッダー情報
		return true;
	}
	//#endregion
	//#region AM_Set11
	public async AM_Set11(iParam) {
		INT.i画面 = 1;
		if (iParam == 0) {
			ClearPanel("panel1");
			$("#cb表示区分").Text("移動元・移動先を表示する");
			this.n表示区分 = 0;
		}
		ClearPanel("panel2");
		ClearPanel("panel3");

		if (iParam == 1) {
			//前画面へ
			$("#panel1").Active();
		}
		// フォーカス制御
		//SetFocus(this);
		return true;
	}
	//#endregion
	//#region AM_Set12
	public async AM_Set12(iParam) {
		INT.i画面 = 2;
		if (iParam == 0) {
			ClearPanel("panel2");
			if ($("#cb表示区分").Text() == "移動元・移動先を表示する") {
				$("#ii移動元").show();
				$("#ii移動元セクション").show();
				$("#ii移動先").show();
				$("#ii移動先セクション").show();
				//
				$("#ii移動元").prop("disabled", false);
				$("#ii移動元セクション").prop("disabled", false);
				$("#ii移動先").prop("disabled", false);
				$("#ii移動先セクション").prop("disabled", false);
				//
				$("#cb表示順 option").remove();
				$("#cb表示順").append("<option value='" + 1 + "'>" + "入力順" + "</option>");
				$("#cb表示順").append("<option value='" + 2 + "'>" + "単品順" + "</option>");
				$("#cb表示順").append("<option value='" + 3 + "'>" + "指示日順" + "</option>");
				$("#cb表示順").append("<option value='" + 4 + "'>" + "移動元順" + "</option>");
				$("#cb表示順").append("<option value='" + 5 + "'>" + "移動先順" + "</option>");
				$("#cb表示順").Text("入力順");
				this.n表示順 = 0;
				$("#cb処理区分").Text("すべて");
				this.n処理区分 = 0;
			}
			else if ($("#cb表示区分").Text() == "移動元・移動先を表示しない") {
				$("#ii移動元").hide();
				$("#ii移動元セクション").hide();
				$("#ii移動先").hide();
				$("#ii移動先セクション").hide();
				//
				$("#ii移動元").prop("disabled", true);
				$("#ii移動元セクション").prop("disabled", true);
				$("#ii移動先").prop("disabled", true);
				$("#ii移動先セクション").prop("disabled", true);
				//
				$("#tbTRC移動元").Data("");
				$("#tbTPC移動元店").Data("");
				$("#tbRPR移動元名").Data("");
				$("#tbTRC移動先").Data("");
				$("#tbTPC移動先店").Data("");
				$("#tbRPR移動先名").Data("");
				$("#tbSEC移動元セクション").Data("");
				$("#tbSNM移動元セク名").Data("");
				$("#tbSEC移動先セクション").Data("");
				$("#tbSNM移動先セク名").Data("");
				//
				$("#cb表示順 option").remove();
				$("#cb表示順").append("<option value='" + 1 + "'>" + "入力順" + "</option>");
				$("#cb表示順").append("<option value='" + 2 + "'>" + "単品順" + "</option>");
				$("#cb表示順").append("<option value='" + 3 + "'>" + "指示日順" + "</option>");
				$("#cb表示順").Text("入力順");
				this.n表示順 = 0;
				$("#cb処理区分").Text("すべて");
				this.n処理区分 = 0;
			}
		}
		else {
			if (await this.AM_Sql12() == false) {
				await this.AM_Set11(1);
				return false;
			}
		}
		$("#panel2").Active();
		// フォーカス制御
		//SetFocus(this);
		// ヘッダー情報
		$("#hd表示区分").Text($("#cb表示区分 option:selected").text());
		return true;
	}
	//#endregion
	//#region AM_Sql12
	public async AM_Sql12() {
		// ワークファイル削除
		DltMyData("ＴＦＧ１１０ＷＦ");
		return true;
	}
	//#endregion
	//#region AM_Set13
	public async AM_Set13(iParam) {
		INT.i画面 = 3;
		// テーブルセット
		if (iParam == 0) {
			ClearPanel("panel3");
			//TblClear(this.tbl1);
			if (await this.AM_Sql13() == false) {
				await this.AM_Set12(1);
				return false;
			}
			// ポピュレートの結果、１件も存在しない場合
			if (this.n存在フラグ == 0) {
				await Message(38450);
				await this.AM_Set12(1);
				//Cursor = Cursors.Default;
				return false;
			}
		}
		await this.AM_Set10(2);
		$("#panel3").Active();
		// フォーカス制御
		this.n表示行 = 1;
		SetFocusCell(this.tbl1, this.n表示行);		//1行目にフォーカスセット
		// ヘッダー情報   
		$("#hd品番").Text($("#tbMHN品番").Data() + " " + $("#tbSB1サブ１").Data() + " " + this.s品名１);
		$("#hdサブ２").Text($("#tbSB2サブ２").Data());
		$("#hdサブ３").Text($("#tbSB3サブ３").Data());
		$("#hd移動元").Text($("#tbTRC移動元").Data() + " " + $("#tbTPC移動元店").Data() + " " + this.s移動元名);
		$("##hd移動元ｾｸｼｮﾝ").Text($("#tbSEC移動元セクション").Data() + " " + this.s移動元セク名);
		$("#hd移動先").Text($("#tbTRC移動先").Data() + " " + $("#tbTPC移動先店").Data() + " " + this.s移動先名);
		$("#hd移動先ｾｸｼｮﾝ").Text($("#tbSEC移動先セクション").Data());
		$("#hd指示日").Text(SetDateMask(this.s指示日));
		$("#hd指示番号").Text($("#tb開始指示番号").Data() + " " + $("#tb終了指示番号").Data());
		$("#hd担当者").Text($("tbTAN指示担当者").Data() + " " + this.s担当者名);
		$("#hd処理区分").Text($("#cb処理区分 option:selected").text());
		$("#hd表示順").Text($("#cb表示順 option:selected").text());
		return true;
	}
	//#endregion
	//#region AM_Sql13
	public async AM_Sql13() {
		// ワークファイル作成
		this.n存在フラグ = 0;
		this.n更新番号 = 0;
		INT.iＲＥＴ = 59780;
		// SP実行
		try {
			const data = await TblPopulate(this.tbl1, "TFG110W130", "ＴＦＧ１１０ＷＦ", "行番号", 1,
				SYS.sCorporation, this.n存在フラグ,
				//
				this.n表示区分, this.s指示日, this.s品番,
				this.sサブ１, this.sサブ２, this.sサブ３,
				this.s移動元, this.s移動元店, this.s移動元セク,
				this.n移動先セクレベル, this.s移動先, this.s移動先店,
				this.s移動先セク, this.n移動先セクレベル, SYS.s管理コード初期値,
				this.n開始指示番号, this.n終了指示番号, this.s担当者,
				this.n処理区分, this.n表示順,
				//
				SYS.sTanc, SYS.sClient, this.n更新番号,
				INT.iＲＥＴ);
			//OUT値セット
			this.n更新番号 = data["Ｐ＿更新番号"];
			INT.iＲＥＴ = data["Ｐ＿ＲＥＴ"];
			this.n存在フラグ = data["Ｐ＿存在フラグ"];
		} catch (e) {
			await Message2(e.Message, "TFG110W130", MB.BUTTON.OK, MB.ICON.Critical);
			return false;
		}
		if (INT.iＲＥＴ != 0) {
			await Message(INT.iＲＥＴ);
			//AM_PushPb3(0);
			return false;
		}
		return true;
	}
	//#endregion
	//#region AM_Chk11
	public async AM_Chk11(iParam, sWndItem?) {
		// 画面１チェック
		INT.iＲＥＴ = 0;
		// 表示区分
		//#region if (sWndItem == "cb表示区分" || iParam == 1)
		if (sWndItem == "cb表示区分" || iParam == 1) {
			if ($("#cb表示区分").Text() == "移動元・移動先を表示する") {
				this.n表示区分 = 0;
			}
			else if ($("#cb表示区分").Text() == "移動元・移動先を表示しない") {
				this.n表示区分 = 1;
			}
		}
		//#endregion
		return true;
	}
	//#endregion
	//#region AM_Chk12
	public async AM_Chk12(iParam, sWndItem?) {
		// 画面１チェック
		INT.iＲＥＴ = 0;
		this.sチェック = "";
		// サブ１使用しない場合
		if (SYS.iサブ１使用区分 == 0) {
			// 品番
			//#region if (sWndItem == "tbMHN品番" || iParam == 1)
			if (sWndItem == "tbMHN品番" || iParam == 1) {
				if ($("#tbMHN品番").Data() == "") {
					this.s品番 = " ";
				}
				else {
					this.s品番 = $("#tbMHN品番").Data();
				}
				this.sサブ１ = " ";
				this.sチェック = "品番";
			}
			//#endregion
		}
		// サブ１使用する場合
		else {
			// 品番
			//#region if (sWndItem == "tbMHN品番" || iParam == 1)
			if (sWndItem == "tbMHN品番" || iParam == 1) {
				if ($("#tbMHN品番").Data() == "") {
					this.s品番 = " ";
				}
				else {
					this.s品番 = $("#tbMHN品番").Data();
				}
			}
			//#endregion
			// サブ１
			//#region if (sWndItem == "tbSB1サブ１" || iParam == 1)
			if (sWndItem == "tbSB1サブ１" || iParam == 1) {
				if ($("#tbSB1サブ１").Data() == "") {
					this.sサブ１ = " ";
				}
				else {
					this.sサブ１ = $("#tbSB1サブ１").Data();
				}
				this.sチェック = "品番";
			}
			//#endregion
		}
		if (SYS.iサブ２使用区分 == 1) {
			// サブ２
			//#region if (sWndItem == "tbSB2サブ２" || iParam == 1)
			if (sWndItem == "tbSB2サブ２" || iParam == 1) {
				if ($("#tbSB2サブ２").Data() == "") {
					this.sサブ２ = " ";
				}
				else {
					this.sサブ２ = $("#tbSB2サブ２").Data();
				}
			}
			//#endregion
		}
		else {
			this.sサブ２ = " ";
		}
		if (SYS.iサブ３使用区分 == 1) {
			// サブ３
			//#region if (sWndItem == "tbSB3サブ３" || iParam == 1)
			if (sWndItem == "tbSB3サブ３" || iParam == 1) {
				if ($("#tbSB3サブ３").Data() == "") {
					this.sサブ３ = " ";
				}
				else {
					this.sサブ３ = $("#tbSB3サブ３").Data();
				}
			}
			//#endregion
		}
		else {
			this.sサブ３ = " ";
		}
		if (SYS.i店桁数 == 0) {
			// 移動元
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
			// 移動元
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
			// 移動元店
			//#region if (sWndItem == "tbTPC移動元店" || iParam == 1)
			if (sWndItem == "tbTPC移動元店" || iParam == 1) {
				if ($("#tbTPC移動元店").Data() == "") {
					this.s移動元店 = " ";
				}
				else {
					this.s移動元店 = $("#tbTPC移動元店").Data();
				}
			}
			//#endregion
		}
		//#region if (sWndItem == "tbSEC移動元セクション" || iParam == 1)
		if (sWndItem == "tbSEC移動元セクション" || iParam == 1) {
			if ($("#tbSEC移動元セクション").Data() == "") {
				this.s移動元セク = " ";
			}
			else {
				this.s移動元セク = $("#tbSEC移動元セクション").Data();
			}
		}
		//#endregion
		else {
			this.s移動元セク = " ";
		}
		if (SYS.i店桁数 == 0) {
			// 移動先
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
			// 移動先
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
			// 移動先店
			//#region if (sWndItem == "tbTPC移動先店" || iParam == 1)
			if (sWndItem == "tbTPC移動先店" || iParam == 1) {
				if ($("#tbTPC移動先店").Data() == "") {
					this.s移動先店 = " ";
				}
				else {
					this.s移動先店 = $("#tbTPC移動先店").Data();
				}
			}
			//#endregion
		}
		//#region if (sWndItem == "tbSEC移動先セクション" || iParam == 1)
		if (sWndItem == "tbSEC移動先セクション" || iParam == 1) {
			if ($("#tbSEC移動先セクション").Data() == "") {
				this.s移動先セク = " ";
			}
			else {
				this.s移動先セク = $("#tbSEC移動先セクション").Data();
			}
		}
		//#endregion
		else {
			this.s移動先セク = " ";
		}
		// 指示日
		//#region if (sWndItem == "tb指示日" || iParam == 1)
		if (sWndItem == "tb指示日" || iParam == 1) {
			if ($("#tb指示日").Data() == "") {
				this.s指示日 = " ";
			}
			else {
				this.s指示日 = $("#tb指示日").Data();
			}
		}
		//#endregion
		// 開始指示番号
		//#region if (sWndItem == "tb開始指示番号" || iParam == 1)
		if (sWndItem == "tb開始指示番号" || iParam == 1) {
			if ($("#tb開始指示番号").Data() != "") {
				this.n開始指示番号 = $("#tb開始指示番号").Data();
			}
			else {
				this.n開始指示番号 = 0;
			}
		}
		//#endregion
		// 終了指示番号
		//#region if (sWndItem == "tb終了指示番号" || iParam == 1)
		if (sWndItem == "tb終了指示番号" || iParam == 1) {
			if ($("#tb終了指示番号").Data() != "") {
				if ($("#tb開始指示番号").Data() != "") {
					if ($("#tb開始指示番号").Data() > $("#tb終了指示番号").Data()) {
						await Message(51480, "指示番号");
						//Cursor	=	Cursors.Default;
						$("#tb開始指示番号").focus();
						return false;
					}
				}
				this.n終了指示番号 = $("#tb終了指示番号").Data();
			}
			else {
				this.n終了指示番号 = 999999999;
			}
		}
		//#endregion
		// 担当者
		//#region if (sWndItem == "tbTAN指示担当者" || iParam == 1)
		if (sWndItem == "tbTAN指示担当者" || iParam == 1) {
			if ($("#tbTAN指示担当者").Data() == "") {
				this.s担当者 = " ";
			}
			else {
				this.s担当者 = $("#tbTAN指示担当者").Data();
			}
		}
		//#endregion
		// 処理区分
		//#region if (sWndItem == "cb処理区分" || iParam == 1)
		if (sWndItem == "cb処理区分" || iParam == 1) {
			if ($("#cb処理区分").Text() == "すべて") {
				// すべて
				this.n処理区分 = 0;
			}
			else if ($("#cb処理区分").Text() == "店舗間移動") {
				// 店舗間移動
				this.n処理区分 = 1;
			}
			else if ($("#cb処理区分").Text() == "物流戻り") {
				// 物流戻り
				this.n処理区分 = 2;
			}
			else if ($("#cb処理区分").Text() == "仕入返品") {
				// 仕入返品
				this.n処理区分 = 3;
			}
			else {
				// すべて
				this.n処理区分 = 0;
			}
		}
		//#endregion
		// 表示順
		//#region if (sWndItem == "cb表示順" || iParam == 1)
		if (sWndItem == "cb表示順" || iParam == 1) {
			if ($("#cb表示順").Text() == "入力順") {
				// 入力順
				this.n表示順 = 0;
			}
			else if ($("#cb表示順").Text() == "単品順") {
				// 単品順
				this.n表示順 = 1;
			}
			else if ($("#cb表示順").Text() == "指示日順") {
				// 指示日順
				this.n表示順 = 2;
			}
			else if ($("#cb表示順").Text() == "移動元順") {
				// 移動元順
				this.n表示順 = 3;
				if ($("#cb表示区分").Text() == "移動元・移動先を表示しない") {
					await Message(76708);
					//Cursor = Cursors.Default;
					$("#cb表示順").focus();
					return false;
				}
			}
			else if ($("#cb表示順").Text() == "移動先順") {
				// 移動先順
				this.n表示順 = 4;
				if ($("#cb表示区分").Text() == "移動元・移動先を表示しない") {
					await Message(76708);
					//Cursor = Cursors.Default;
					$("#cb表示順").focus();
					return false;
				}
			}
			else {
				// 入力順
				this.n表示順 = 0;
			}
		}
		//#endregion
		// すべて
		if (iParam == 1) {
			this.sチェック = "ＡＬＬ";
		}
		if (this.sチェック == "品番" || this.sチェック == "ＡＬＬ") {
			INT.iＲＥＴ = 59780;
			INT.iＥＲＲ = 1;
			try {
				const data = await ExecuteSQL("NFG110C120",
					SYS.sCorporation, this.sチェック, this.s品番,
					this.sサブ１, this.sサブ２, this.sサブ３,
					this.s品名１, this.s移動元, this.s移動元店,
					this.s移動元名, this.s移動元セク, this.s移動元セク名,
					this.n移動元セクレベル, this.s移動先, this.s移動先店,
					this.s移動先名, this.s移動先セク, this.s移動先セク名,
					this.n移動先セクレベル, this.s指示日, this.n開始指示番号,
					this.n終了指示番号, this.s担当者, this.s担当者名,
					this.n処理区分, SYS.iサブ２使用区分, SYS.iサブ３使用区分,
					SYS.s管理コード初期値, INT.iＥＲＲ, INT.iＲＥＴ);
				//OUT値セット
				this.sチェック = data["Ｐ＿チェック"];
				this.s品名１ = data["Ｐ＿品名１"];
				this.s移動元名 = data["Ｐ＿移動元名"];
				this.s移動元セク名 = data["Ｐ＿移動元セク名"];
				this.n移動元セクレベル = data["Ｐ＿移動元セクレベル"];
				this.s移動先名 = data["Ｐ＿移動先名"];
				this.s移動先セク名 = data["Ｐ＿移動先セク名"];
				this.n移動先セクレベル = data["Ｐ＿移動先セクレベル"];
				this.s担当者名 = data["Ｐ＿担当者名"];
				INT.iＥＲＲ = data["Ｐ＿ＥＲＲ"];
				INT.iＲＥＴ = data["Ｐ＿ＲＥＴ"];
			}
			catch (e) {
				await Message2(e.Message, "NFG110C120", MB.BUTTON.OK, MB.ICON.Critical);
				//Cursor	=	Cursors.Default;
				//SetFocus(this);
				return false;
			}
			if (INT.iＲＥＴ != 0) {
				await Message(INT.iＲＥＴ);
			}
			//#region this.switch (INT.iＲＥＴ)
			switch (INT.iＲＥＴ) {
				case 0:
					break;
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
				case 35170:
					if (INT.iＥＲＲ == 1) {
						$("#tbSB2サブ２").focus();
					}
					else if (INT.iＥＲＲ == 2) {
						$("#tbSB3サブ３").focus();
					}
					return false;
				case 34233:
					$("#tbTRC移動元").focus();
					return false;
				case 34234:
					$("#tbTRC移動先").focus();
					return false;
				case 35740:
					$("#tb指示日").focus();
					return false;
				case 5640:
				case 35340:
				case 76562:
					$("#tbTAN指示担当者").focus();
					return false;
				case 38450:
					$("#cb表示区分").focus();
					return false;
				default:
					//SetFocus(this);
					return false;
			}
			//#endregion
			//#region if (INT.iＲＥＴ == 0)
			if (INT.iＲＥＴ == 0) {
				//#region if (this.sチェック == "品番" || this.sチェック == "ＡＬＬ")
				if (this.sチェック == "品番" || this.sチェック == "ＡＬＬ") {
					//$("#tbHN1品名１").Data(this.s品名１);
				}
				//#endregion
				//#region if (this.sチェック == "ＡＬＬ")
				if (this.sチェック == "ＡＬＬ") {
					$("#tbRPR移動元名").Data(this.s移動元名);
					$("#tbSNM移動元セク名").Data(this.s移動元セク名);
					$("#tbRPR移動先名").Data(this.s移動先名);
					$("#tbSNM移動先セク名").Data(this.s移動先セク名);
					$("#tbTNM指示担当者名").Data(this.s担当者名);
				}
				//#endregion
			}
			//#endregion
		}
		return true;
	}
	//#endregion
	//#region AM_Chk13
	public async AM_Chk13(iParam: number, sWndItem: string, sWndCol: string) {
		// チェックボックスのチェック
		this.n入力チェック = 0;
		this.sチェック = "";
		//#region if (sWndItem == "tbl1" || iParam == 1)
		if (sWndItem == "tbl1" || iParam == 1) {
			//tbl1.FinishEditing();
			if (iParam == 0) {
				INT.i最小行 = Number(TblGetContext(this.tbl1));
			}
			else {
				INT.i最小行 = 1;
			}
			//明細行チェック
			//#region for (int i = INT.i最小行; ; i++)
			let dm = this.tbl1.hlnGrid("option", "dataModel.data");
			for (let i: number = INT.i最小行; ; i++) {
				if (TblSetContext(this.tbl1, i) == true) {
					if (dm[i - 1]["rowflag"] == undefined && iParam != 0) continue;
					if (sWndCol == "col選択" || iParam == 1) {
						if (TblGetNumberData(this.tbl1, "col選択") == 1) {
							this.n入力チェック = 1;
						}
						else {
							TblSetData(this.tbl1, "col選択", null);
						}
					}
				}
				//個別チェックは１行でブレイク
				if (TblSetContext(this.tbl1, i) == false || iParam == 0) {
					break;
				}
			}
			//#endregion
		}
		//#endregion
		//
		//#region if (iParam == 1)
		if (iParam == 1) {
			this.sチェック = "ＡＬＬ";
		}
		//#endregion
		// ================
		// 全体チェック
		// ================
		//#region if (this.sチェック == "ＡＬＬ")
		if (this.sチェック == "ＡＬＬ") {
			if (this.n入力チェック == 0) {
				await Message(50320);
				//Cursor	=	Cursors.Default;
				SetFocusCell(this.tbl1, 1);
				return false;
			}
		}
		//#endregion
		return true;
	}
	//#endregion
	//#region AM_Upd13
	public async AM_Upd13(iParam) {
		//Cursor	=	Cursors.WaitCursor;
		INT.iＲＥＴ = 0;
		INT.i処理行数 = 0;
		INT.i終了処理フラグ = 0;
		this.nＳＰ最終実行フラグ = 0;
		this.sＴ指示番号 = [];
		this.sＴ指示行番号 = [];
		this.sＴ元更新番号 = [];
		this.sＴ行 = [];
		// 連結更新
		//#region for (int i = 1; ; i++)
		let dm = this.tbl1.hlnGrid("option", "dataModel.data");
		for (let i: number = 1; ; i++) {
			if (TblSetContext(this.tbl1, i) == true) {
				if (dm[i - 1]["rowflag"] == undefined) continue;
				if (TblGetNumberData(this.tbl1, "col選択") == 1) {
					// パラメータ連結
					this.sＴ指示番号.arrayListPad(TblGetNumberData(this.tbl1, "col指示番号"));
					this.sＴ指示行番号.arrayListPad(TblGetNumberData(this.tbl1, "col指示行番号"));
					this.sＴ元更新番号.arrayListPad(TblGetNumberData(this.tbl1, "col元更新番号"));
					this.sＴ行.arrayListPad(i.toString());
					INT.i処理行数++;
				}
			}
			else {
				INT.i終了処理フラグ = 1;
			}
			if (INT.i終了処理フラグ == 1 && INT.i処理行数 > 0) {
				INT.iＲＥＴ = 59780;
				try {
					const data = await ExecuteSQL("NFG110T130",
						SYS.sCorporation, this.n表示区分,
						//
						this.sＴ指示番号, this.sＴ指示行番号, this.sＴ元更新番号,
						this.sＴ行,
						//
						INT.i処理行数, SYS.sClient, this.nＳＰ最終実行フラグ,
						INT.iＥＲＲ行, INT.iＲＥＴ);
					//OUT値セット
					this.sＴ行 = data["ＰＴ＿行"];
					INT.iＥＲＲ行 = data["Ｐ＿ＥＲＲ行"];
					INT.iＲＥＴ = data["Ｐ＿ＲＥＴ"];
				}
				catch (e) {
					await Message2(e.Message, "NFG110T130", MB.BUTTON.OK, MB.ICON.Critical);
					//frmWait.Dispose();
					//Cursor	=	Cursors.Default;
					//SetFocus(this);
					return false;
				}
				if (INT.iＲＥＴ != 0) {
					await Message(INT.iＲＥＴ);
					//frmWait.Dispose();
					SetFocusCell(this.tbl1, INT.iＥＲＲ行);
					//Cursor = Cursors.Default;
					return false;
				}
			}
			if (INT.i終了処理フラグ == 1) {
				INT.i処理行数 = 0;
				break;
			}
		}
		//#endregion
		//frmWait.Dispose();
		//Cursor	=	Cursors.Default;
		return true;
	}
	//#endregion
	//#region AM_PushPb1
	public async AM_PushPb1(iParam, sWndItem?) {
		//Cursor	=	Cursors.WaitCursor;
		//#region if (sWndItem == "tbMHN品番")
		//    if (sWndItem == "tbMHN品番") {
		//        this.s品番 = $("#tbMHN品番").Data();
		//        this.nパラメータ１ = 10;
		//        if ($("#tbSB1サブ１").Data() == "") {
		//            this.sサブ１ = " ";
		//        }
		//        else {
		//            this.sサブ１ = $("#tbSB1サブ１").Data();
		//        }
		//        this.nパラメータ１ = 14;
		//        $("#contents").showtzce110e({
		//            s品番: this.s品番,
		//            sサブ１: this.sサブ１,
		//            s品名１: this.s品名１,
		//            s品名２: this.s品名２,
		//            //SYS.s品番名称: SYS.s品番名称,
		//            //SYS.sサブ１名称: SYS.sサブ１名称,
		//            //SYS.s品名１名称: SYS.s品名１名称,
		//            //SYS.s品名２名称: SYS.s品名２名称,
		//            nパラメータ１: this.nパラメータ１
		//        }).done(function (tzce110e) {
		//            //nzce110e.nzce110e_return nzce110 = dlg.nzce110e_param;
		//            $("#tbMHN品番").Data(tzce110e.品番);
		//            $("#tbSB1サブ１").Data(tzce110e.サブ１);
		//            //$("#tbHN1品名１").Data(tzce110e.品名１);
		//        }
		////dlg.Dispose();
		////$("#tbMHN品番").focus();
		//    }

		//    //#endregion
		//    //#region	if (sWndItem == "tbSB2サブ２")
		//    if (sWndItem == "tbSB2サブ２") {
		//        this.s品番 = $("#tbMHN品番").Data();
		//        if ($("#tbSB1サブ１").Data() == "") {
		//            this.sサブ１ = " ";
		//        }
		//        else {
		//            this.sサブ１ = $("#tbSB1サブ１").Data();
		//        }
		//        if ($("#tbSB2サブ２").Data() == "") {
		//            this.sサブ２ = " ";
		//        }
		//        else {
		//            this.sサブ２ = $("#tbSB2サブ２").Data();
		//        }
		//        $("#contents").showtzce114e({
		//            s品番: this.s品番,
		//            sサブ１: this.sサブ１,
		//            sサブ２: this.sサブ２,
		//            sサブ３: this.sサブ３,
		//            s品名１: this.s品名１,
		//            s品名２: this.s品名２,
		//            //SYS.s品番名称: SYS.s品番名称,
		//            //SYS.sサブ１名称: SYS.sサブ１名称,
		//            //SYS.sサブ２名称: SYS.sサブ２名称,
		//            //SYS.sサブ３名称: SYS.sサブ３名称,
		//            //SYS.s品名１名称: SYS.s品名１名称,
		//            //SYS.s品名２名称: SYS.s品名２名称
		//        }).done(function (tzce114e) {
		//            //nzce114e.nzce114e_return nzce114 = dlg.nzce114e_param;
		//            $("#tbSB2サブ２").Data(tzce114e.サブ２);
		//            $("#tbSB3サブ３").Data(tzce114e.サブ３);
		//        }
		////dlg.Dispose();
		////$("#tbSB2サブ２").focus();
		//    }
		//    //#endregion
		//    //#region	if (sWndItem == "tbSB3サブ３")
		//    if (sWndItem == "tbSB3サブ３") {
		//        this.s品番 = $("#tbMHN品番").Data();
		//        if ($("#tbSB1サブ１").Data() == "") {
		//            this.sサブ１ = " ";
		//        }
		//        else {
		//            this.sサブ１ = $("#tbSB1サブ１").Data();
		//        }
		//        if ($("#tbSB2サブ２").Data() == "") {
		//            this.sサブ２ = " ";
		//        }
		//        else {
		//            this.sサブ２ = $("#tbSB2サブ２").Data();
		//        }
		//        $("#contents").showtzce114e({
		//            s品番: this.s品番,
		//            sサブ１: this.sサブ１,
		//            sサブ２: this.sサブ２,
		//            sサブ３: this.sサブ３,
		//            s品名１: this.s品名１,
		//            s品名２: this.s品名２,
		//            //SYS.s品番名称: SYS.s品番名称,
		//            //SYS.sサブ１名称: SYS.sサブ１名称,
		//            //SYS.sサブ２名称: SYS.sサブ２名称,
		//            //SYS.sサブ３名称: SYS.sサブ３名称,
		//            //SYS.s品名１名称: SYS.s品名１名称,
		//            //SYS.s品名２名称: SYS.s品名２名称
		//        }).done(function (tzce114e) {
		//            //nzce114e.nzce114e_return nzce114 = dlg.nzce114e_param;
		//            $("#tbSB2サブ２").Data(tzce114e.サブ２);
		//            $("#tbSB3サブ３").Data(tzce114e.サブ３);
		//        }
		////dlg.Dispose();
		////$("#tbSB3サブ３").focus();
		//    }
		//    //#endregion
		//#region if (sWndItem == "tbTRC移動元")
		if (sWndItem == "tbTRC移動元") {
			this.s移動元セク = $("#tbSEC移動元セクション").Data();
			this.s移動元 = $("#tbTRC移動元").Data();
			this.s移動元店 = $("#tbTPC移動元店").Data();
			this.nパラメータ１ = 1;
			const dlg = new tzfg100e(this.s移動元セク, this.s移動元, this.s移動元店,
				this.s移動元名, SYS.s売上関連処理日, this.nパラメータ１,
				SYS.s管理コード初期値);
			if (await dlg.showTzfg100e() == DialogResult.OK) {
				TblInitializeRow(this.tbl1);
				$("#tbTRC移動元").Data(dlg.店舗);
				$("#tbTPC移動元店").Data(dlg.店);
				$("#tbRPR移動元名").Data(dlg.店舗名);
				$("#tbSEC移動元セクション").Data(dlg.セクション);
				$("#tbSNM移動元セク名").Data(dlg.セクション名);
				this.s移動元 = $("#tbTRC移動元").Data();
				this.s移動元店 = $("#tbTPC移動元店").Data();
				this.s移動元セク = $("#tbSEC移動元セクション").Data();
			}
			//$("#tbTRC移動元").focus();
			//        $("#contents").showtzfg100e({
			//            s移動元セク: this.s移動元セク,
			//            s移動元: this.s移動元,
			//            s移動元店: this.s移動元店,
			//            s移動元名: this.s移動元名,
			//            //SYS.s売上関連処理日: SYS.s売上関連処理日,
			//            nパラメータ１: this.nパラメータ１
			//        }).done(function (tzfg100e) {
			//            //nzfg100e.nzfg100e_return nzfg100 = dlg.nzfg100e_param;
			//            $("#tbTRC移動元").Data(tzfg100e.店舗);
			//            $("#tbTPC移動元店").Data(tzfg100e.店);
			//            $("#tbRPR移動元名").Data(tzfg100e.店舗名);
			//            $("#tbSEC移動元セクション").Data(tzfg100e.セクション);
			//            $("#tbSNM移動元セク名").Data(tzfg100e.セクション名);
			//            this.s移動元 = $("#tbTRC移動元").Data();
			//            this.s移動元店 = $("#tbTPC移動元店").Data();
			//            this.s移動元セク = $("#tbSEC移動元セクション").Data();
			//        }
			////dlg.Dispose();
			//////$("#tbTRC移動元").focus();
		}
		//#endregion
		//#region if (sWndItem == "tbTPC移動元店")
		if (sWndItem == "tbTPC移動元店") {
			this.s移動元セク = $("#tbSEC移動元セクション").Data();
			this.s移動元 = $("#tbTRC移動元").Data();
			this.s移動元店 = $("#tbTPC移動元店").Data();
			this.nパラメータ１ = 2;
			const dlg = new tzfg100e(this.s移動元セク, this.s移動元, this.s移動元店,
				this.s移動元名, SYS.s売上関連処理日, this.nパラメータ１,
				SYS.s管理コード初期値);
			if (await dlg.showTzfg100e() == DialogResult.OK) {
				TblInitializeRow(this.tbl1);
				$("#tbTRC移動元").Data(dlg.店舗);
				$("#tbTPC移動元店").Data(dlg.店);
				$("#tbRPR移動元名").Data(dlg.店舗名);
				$("#tbSEC移動元セクション").Data(dlg.セクション);
				$("#tbSNM移動元セク名").Data(dlg.セクション名);
				this.s移動元 = $("#tbTRC移動元").Data();
				this.s移動元店 = $("#tbTPC移動元店").Data();
				this.s移動元セク = $("#tbSEC移動元セクション").Data();
			}
			//$("#tbTPC移動元店").focus();
			//        $("#contents").showtzfg100e({
			//            s移動元セク: this.s移動元セク,
			//            s移動元: this.s移動元,
			//            s移動元店: this.s移動元店,
			//            s移動元名: this.s移動元名,
			//            //SYS.s売上関連処理日: SYS.s売上関連処理日,
			//            nパラメータ１: this.nパラメータ１
			//        }).done(function (tzfg100e) {
			//            //nzfg100e.nzfg100e_return nzfg100 = dlg.nzfg100e_param;
			//            $("#tbTRC移動元").Data(tzfg100e.店舗);
			//            $("#tbTPC移動元店").Data(tzfg100e.店);
			//            $("#tbRPR移動元名").Data(tzfg100e.店舗名);
			//            $("#tbSEC移動元セクション").Data(tzfg100e.セクション);
			//            $("#tbSNM移動元セク名").Data(tzfg100e.セクション名);
			//            this.s移動元 = $("#tbTRC移動元").Data();
			//            this.s移動元店 = $("#tbTPC移動元店").Data();
			//            this.s移動元セク = $("#tbSEC移動元セクション").Data();
			//        }
			////dlg.Dispose();
			////$("#tbTPC移動元店").focus();
		}
		//#endregion
		//#region if (sWndItem == "tbSEC移動元セクション")
		if (sWndItem == "tbSEC移動元セクション") {
			this.s移動元セク = $("#tbSEC移動元セクション").Data();
			const dlg = new tzcc110e(this.s移動元セク, this.s移動元セク名, this.nセク使用区分);
			if (await dlg.showTzcc110e() == DialogResult.OK) {
				$("#tbSEC移動元セクション").Data(dlg.セクション);
				$("#tbSNM移動元セク名").Data(dlg.セクション名);
			}
			//$("#tbSEC移動元セクション").focus();
		}
		//#endregion
		//#region if (sWndItem == "tbTRC移動先")
		if (sWndItem == "tbTRC移動先") {
			this.s移動先セク = $("#tbSEC移動先セクション").Data();
			//this.s移動先セク名 = $("#tbSNM移動先セク名").Data();
			this.s移動先 = $("#tbTRC移動先").Data();
			this.s移動先店 = $("#tbTPC移動先店").Data();
			this.nパラメータ１ = 1;
			const dlg = new tzfg110e(this.s移動先セク, this.s移動先セク名, this.s移動先,
				this.s移動先店, this.s移動先名, SYS.s売上関連処理日,
				this.nパラメータ１, SYS.s管理コード初期値);
			if (await dlg.showTzfg110e() == DialogResult.OK) {
				TblInitializeRow(this.tbl1);
				$("#tbTRC移動先").Data(dlg.取引先);
				$("#tbTPC移動先店").Data(dlg.店);
				$("#tbRPR移動先名").Data(dlg.取引先店略名);
				$("#tbSEC移動先セクション").Data(dlg.セクション);
				$("#tbSNM移動先セク名").Data(dlg.セクション名);
				this.s移動先 = $("#tbTRC移動先").Data();
				this.s移動先店 = $("#tbTPC移動先店").Data();
				this.s移動先セク = $("#tbSEC移動先セクション").Data();
				this.s移動先セク名 = $("#tbSNM移動先セク名").Data();
			}
			//$("#tbTRC移動先").focus();
		}
		//#endregion
		//#region if (sWndItem == "tbTPC移動先店")
		if (sWndItem == "tbTPC移動先店") {
			this.s移動先セク = $("#tbSEC移動先セクション").Data();
			//this.s移動先セク名 = $("#tbSNM移動先セク名").Data();
			this.s移動先 = $("#tbTRC移動先").Data();
			this.s移動先店 = $("#tbTPC移動先店").Data();
			this.nパラメータ１ = 2;
			const dlg = new tzfg110e(this.s移動先セク, this.s移動先セク名, this.s移動先,
				this.s移動先店, this.s移動先名, SYS.s売上関連処理日,
				this.nパラメータ１, SYS.s管理コード初期値);
			if (await dlg.showTzfg110e() == DialogResult.OK) {
				TblInitializeRow(this.tbl1);
				$("#tbTRC移動先").Data(dlg.取引先);
				$("#tbTPC移動先店").Data(dlg.店);
				$("#tbRPR移動先名").Data(dlg.取引先店略名);
				$("#tbSEC移動先セクション").Data(dlg.セクション);
				$("#tbSNM移動先セク名").Data(dlg.セクション名);
				this.s移動先 = $("#tbTRC移動先").Data();
				this.s移動先店 = $("#tbTPC移動先店").Data();
				this.s移動先セク = $("#tbSEC移動先セクション").Data();
				this.s移動先セク名 = $("#tbSNM移動先セク名").Data();
			}
			////dlg.Dispose();
			//$("#tbTPC移動先店").focus();
		}
		//#endregion
		//#region if (sWndItem == "tbSEC移動先セクション")
		if (sWndItem == "tbSEC移動先セクション") {
			this.s移動元セク = $("#tbSEC移動先セクション").Data();
			const dlg = new tzcc110e(this.s移動先セク, this.s移動先セク名, this.nセク使用区分);
			if (await dlg.showTzcc110e() == DialogResult.OK) {
				$("#tbSEC移動先セクション").Data(dlg.セクション);
				$("#tbSNM移動先セク名").Data(dlg.セクション名);
			}
			//$("#tbSEC移動先セクション").focus();
		}
		//#endregion
		//    //#region if (sWndItem == "tbTAN指示担当者")
		//    if (sWndItem == "tbTAN指示担当者") {
		//        this.s担当者 = $("#tbTAN指示担当者").Data();
		//        $("#contents").showtzcc120e({
		//            s担当者: this.s担当者,
		//            s担当者名: this.s担当者名
		//        }).done(function (tzcc120e) {
		//            //nzcc120e.nzcc120e_return nzcc120 = dlg.nzcc120e_param;
		//            $("#tbTAN指示担当者").Data(tzcc120e.担当者);
		//            $("#tbTNM指示担当者名").Data(tzcc120e.担当者名);
		//        }
		////dlg.Dispose();
		////$("#tbTAN指示担当者").focus();
		//    }
		////#endregion
		////Cursor = Cursors.Default;
		//return true;

		//}
		return true;
	}
	//#endregion
	//#region AM_PushPb3
	public async AM_PushPb3(iParam) {
		//Cursor	=	Cursors.WaitCursor;
		if (INT.i画面 == 2) {
			await this.AM_Set11(1);
		}
		else if (INT.i画面 == 3) {
			await this.AM_Set12(1);
		}
		//Cursor	=	Cursors.Default;
		return true;
	}
	//#endregion
	//#region AM_PushPb4
	public async AM_PushPb4(iParam) {
		// 次画面
		//Cursor	=	Cursors.WaitCursor;
		if (INT.i画面 == 1) {
			if (await this.AM_Chk11(1) == true) {
				if (await this.AM_Set12(0) == false) {
					//Cursor = Cursors.Default;
					return false;
				}
			}
			else {
				//Cursor = Cursors.Default;
				return false;
			}
		}
		else if (INT.i画面 == 2) {
			if (await this.AM_Chk12(1) == true) {
				if (await this.AM_Set13(0) == false) {
					//Cursor = Cursors.Default;
					return false;
				}
			}
			else {
				//Cursor	=	Cursors.Default;
				return false;
			}
		}
		//Cursor	=	Cursors.Default;
		return true;
	}
	//#endregion
	//#region AM_PushPb5
	public async AM_PushPb5(iParam) {
		// 取消
		//Cursor	=	Cursors.WaitCursor;
		if (INT.i画面 == 1) {
			await this.AM_Set11(0);
		}
		else if (INT.i画面 == 2) {
			if (await this.AM_Set12(0) == false) {
				//Cursor = Cursors.Default;
				return false;
			}
		}
		else if (INT.i画面 == 3) {
			if (await this.AM_Set13(0) == false) {
				//Cursor = Cursors.Default;
				return false;
			}
		}
		//Cursor	=	Cursors.Default;
		return true;
	}
	//#endregion
	//#region AM_PushPb9
	public async AM_PushPb9(iParam: number) {
		//Cursor				=	Cursors.WaitCursor;
		if (await this.AM_Chk13(1, null, "ALL") == false) {
			//frmWait01.Dispose();
			//Cursor	=	Cursors.Default;
			return false;
		}
		else {
			//frmWait01.Dispose();
			//Cursor								=	Cursors.Default;
			this.sメッセージ１ = "登録します。\n確認してください";
			if (await ShowDialog(this.sメッセージ１) == DialogResult.OK) {
				if (await this.AM_Upd13(0) == true) {
					await this.AM_Set11(1);
					return true;
				}
				else {
					return false;
				}
			}
			else {
				//dlgConfirm.Dispose();
				SetFocusCell(this.tbl1, 1);
				//Cursor = Cursors.Default;
				return false;
			}
		}
	}
	//#endregion
	//#region AM_PushPb10
	public async AM_PushPb10(iParam) {
		//     一括選択
		//Cursor	=	Cursors.WaitCursor;
		//#region for (int i = 1; ; i++)
		for (let i: number = 1; ; i++) {
			if (TblSetContext(this.tbl1, i) == true) {
				if (TblChkData(this.tbl1, "col指示番号") == true) {
					TblSetData(this.tbl1, "col選択", 1);
				}
			}
			else {
				break;
			}
		}
		//#endregion
		//Cursor	=	Cursors.Default;        
		//            } 
		return true;
	}
	//#endregion
}

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