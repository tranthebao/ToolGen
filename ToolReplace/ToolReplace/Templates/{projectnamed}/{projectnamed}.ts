// ================================================================================
// FILE-ID             {ProjectName}.SLN
// CODING-DATE         {DateNote}
// REMARKS             {TitleName}
// NOTE
// ================================================================================
let tzca220e_that;
//export default class tzca220e {
class tzca220e {
	//IN
	private nＭＤ年: number;
	private nＭＤ週: number;
	//OUT
	public ＭＤ年週: string;
	// 変数
	private n検索区分: number = 0;
	private n更新番号: number = 0;
	private tzca220e_tbl01;

	//#region
	constructor(psＭＤ年週: string) {

		this.nＭＤ年 = StrToNumber(StrMidBX(psＭＤ年週, 0, 4));
		this.nＭＤ週 = StrToNumber(StrMidBX(psＭＤ年週, 4, 7 - StrLenB(this.nＭＤ年)));

		this.loadtbl1(false);
		this.AM_Create();
		this.AM_Sql();
		tzca220e_that = this;
	}
	//#endregion
	//#region loadtbl1
	private loadtbl1(editable: boolean) {
		const dataModel = Array.apply(null, Array(21)).map(function () { return {}; });
		const obj: any = { gridName: "tzca220e_tbl01", gridMode: "hlnView", enableRows: 21, width: 1200, height: 400, showTitle: false, collapsible: false, showBottom: false, freezeCols: 2, freezeRows: 0, numberCell: { title: "#" }, stripeRows: false, editable: editable, selectionModel: { type: 'row', mode: 'single', all: true }};
		obj.dataModel = { data: dataModel };
		obj.scrollModel = { autoFit: false };

		obj.colModel = [
			{ dataIndx: "colＭＤ年", title: "ＭＤ年", width: 60, dataType: "integer", maxLen: 4, align: "right", editable: false },
			{ dataIndx: "colＭＤ週", title: "ＭＤ週", width: 60, dataType: "integer", maxLen: 3, align: "right", editable: false },
			{
				dataIndx: "col開始日付", title: "開始日付", width: 100, dataType: "date", maxLen: 10, editable: false,
				render: function (ui) { return TblSetMask(ui.cellData, "date", SYS.sDateMask); }
			},
			{ dataIndx: "colから", title: " ", width: 10, dataType: "string", maxLen: 1, editable: false },
			{
				dataIndx: "col終了日付", title: "終了日付", width: 100, dataType: "date", maxLen: 10, editable: false,
				render: function (ui) { return TblSetMask(ui.cellData, "date", SYS.sDateMask); }
			}
		];

		this.tzca220e_tbl01 = $("#tzca220e_tbl01").removeData().hlnGrid(obj);
		this.tzca220e_tbl01.hlnGrid("refresh");
	}
	//#endregion
	//#region AM_Create
	public async AM_Create() {
		$("#tzca220e_title").Text("ＭＤ年週検索");
		if (this.nＭＤ年 != null && this.nＭＤ年 != 0) {
			$("#tzca220e_tbＭＤ年").Data(this.nＭＤ年);
		}
		if (this.nＭＤ週 != null && this.nＭＤ週 != 0) {
			$("#tzca220e_tbＭＤ週").Data(this.nＭＤ週);
		}
		return true;
	}
	//#endregion
	//#region AM_Sql
	public async AM_Sql() {
		this.nＭＤ年 = $("#tzca220e_tbＭＤ年").Data();
		this.nＭＤ週 = $("#tzca220e_tbＭＤ週").Data();
		try {
			// SP実行
			const data = await TblPopulate(this.tzca220e_tbl01, "TZCA220W10", "ＴＺＣＡ２２０ＷＦ", "行番号", 1,
				SYS.sCorporation, this.nＭＤ年, this.nＭＤ週,
				SYS.sClient, SYS.sTanc, 0,
				INT.iＲＥＴ);
			//OUT値セット
			this.n更新番号 = data["Ｐ＿更新番号"];
			INT.iＲＥＴ = data["Ｐ＿ＲＥＴ"];
		}
		catch (e) {
			await Message2(e.Message, "TZCA220W10");
			return false;
			}
		SetFocusCell(this.tzca220e_tbl01, 1);
		return true;
	}
	//#endregion
	//#region showTzca220e
	public showTzca220e(): any {
		var d = $.Deferred();
		//#region 明細表示
		$(".tzca220e .btn_tzca220e_select").on("click", function () {
			tzca220e_that.AM_Sql();
		});
		//#endregion
		//#region ＯＫ
		$(".tzca220e .btn_tzca220e_run").on("click", async function () {
			$(".tzca220e .btn_tzca220e_run").off("click");
			$(".tzca220e .btn_tzca220e_close").off("click");
			$(".tzca220e .btn_tzca220e_select").off("click");
			$("#tzca220e_tbl01").off("click");
			const select_row = TblGetSelectRowIndex(tzca220e_that.tzca220e_tbl01);
			if (select_row != null) {
				//this.sＭＤ年 = NumLPad(TblGetNumberData(tzca220e_that.tzca220e_tbl01, "colＭＤ年", select_row), 4, 0);
				//this.sＭＤ週 = NumLPad(TblGetNumberData(tzca220e_that.tzca220e_tbl01, "colＭＤ週", select_row), 3, 0);
				tzca220e_that.ＭＤ年週 = NumLPad(TblGetNumberData(tzca220e_that.tzca220e_tbl01, "colＭＤ年", select_row), 4, 0) + NumLPad(TblGetNumberData(tzca220e_that.tzca220e_tbl01, "colＭＤ週", select_row), 3, 0);
			}
			$("#tzca220e").removeClass("show");
			d.resolve(DialogResult.OK);
		});
		//#endregion

		//#region Cancel
		$(".tzca220e .btn_tzca220e_close").on("click", function () {
			$(".tzca220e .btn_tzca220e_run").off("click");
			$(".tzca220e .btn_tzca220e_close").off("click");
			$(".tzca220e .btn_tzca220e_select").off("click");
			$("#tzca220e_table").off("click");
			$("#tzca220e").removeClass("show");
			d.resolve(DialogResult.Cancel);
		});
		//#endregion

		$("#tzca220e").addClass('show');
		return d.promise();
	};
	//#endregion
}