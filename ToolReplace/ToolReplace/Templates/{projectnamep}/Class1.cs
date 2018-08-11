using System;
using Holon.Web.Api.Models;
using System.Data;

namespace {projectnamep}
{
    public class {projectnamep}
		{
 			#region Window Variables
			// Ｐファイル情報構造体
			public struct PFILE
			{
				public static string		sＰファイル名					=	"ＦＣ３００Ｐ";
 
				public static string		s法人名称							=	string.Empty;
				public static string		s作成日付							=	string.Empty;
				public static string		s作成時間							=	string.Empty;
				public static string		s行区分								=	string.Empty;
 
				public static string		sＨ１棚卸日付					=	string.Empty;
				public static string		sＨ１店舗セクション		=	string.Empty;
				public static string		sＨ１店舗セク名				=	string.Empty;
				public static string		sＨ１店舗取引先				=	string.Empty;
				public static string		sＨ１店舗取引先店			=	string.Empty;
				public static string		sＨ１店舗取引先名			=	string.Empty;
				public static string		sＨ１ブロック番号			=	string.Empty;
				public static string		sＨ１実棚担当者				=	string.Empty;
				public static string		sＨ１実棚担当者名			=	string.Empty;
				public static string		sＨ１処理日付					=	string.Empty;
				public static Number		nＨ１出力区分					=	0;
				public static Number		nＨ１棚卸方式区分			=	0;
 
				public static Number		nＢ１エラーフラグ			=	0;
				public static string		sＢ１ＳＫＵ						=	string.Empty;
				public static string		sＢ１品番							=	string.Empty;
				public static string		sＢ１サブ１						=	string.Empty;
				public static string		sＢ１サブ２						=	string.Empty;
				public static string		sＢ１サブ３						=	string.Empty;
				public static string		sＢ１品名１						=	string.Empty;
				public static string		sＢ１品名２						=	string.Empty;
				public static Number		nＢ１実棚数						=	0;
				public static Number		nＢ１入出荷数					=	0;
				public static string		sＢ１単位名						=	string.Empty;
				public static Number		nＢ１売価単価					=	0;
				public static string		sＢ１作成日付					=	string.Empty;
				public static string		sＢ１作成時間					=	string.Empty;
				public static string		sＢ１エラーメッセージ	=	string.Empty;
			}
			public int REPiページ;
      public int SPLiページ;
      public int SPLi行位置;
			private string sファイル名 = string.Empty;
			private int SPLiスプール番号;
			private int REPi開始頁;
			private int REPi終了頁;
			private string SYSsCorporation;
 
			private int SYSi単位入力制御区分;
			private int SYSi単価小数以下桁数;
			private int SYSi帳票数量小数以下桁数;
			private string SYSsサブ１名称;
			private string SYSsサブ２名称;
			private string SYSsサブ３名称;
			private string SYSs品名１名称;
			private string SYSs品名２名称;
			private string SYSs品番制御マスク;
			private string SYSs品番名称;
			private string SYSs小売単価名称;
			private string SYSsＳＫＵ制御マスク;
			private string SYSsＳＫＵ名称;
		#endregion
				#region pfc300l
        public pfc300l(string fileName,string spoolNo,string pageStart,string pageEnd,string corporation)
        {
            sファイル名 = fileName;
            SPLiスプール番号 = int.Parse(spoolNo);
            REPi開始頁 = int.Parse(pageStart);
            REPi終了頁 = int.Parse(pageEnd);
            SYSsCorporation = corporation;
       }
				#endregion
				#region LoadPrintProccess()
				public int LoadPrintProccess()
				{
					// システム値の取得
					SYSi単位入力制御区分	=	Convert.ToInt16(CommonFunction.GetSysValue(SYSsCorporation, "単位入力制御区分"));
					SYSi単価小数以下桁数	=	Convert.ToInt16(CommonFunction.GetSysValue(SYSsCorporation, "単価小数以下桁数"));
					SYSi帳票数量小数以下桁数	=	0;
					SYSsサブ１名称	=	CommonFunction.GetSysValue(SYSsCorporation, "サブ１名称");
					SYSsサブ２名称	=	CommonFunction.GetSysValue(SYSsCorporation, "サブ２名称");
					SYSsサブ３名称	=	CommonFunction.GetSysValue(SYSsCorporation, "サブ３名称");
					SYSs品名１名称	=	CommonFunction.GetSysValue(SYSsCorporation, "品名１名称");
					SYSs品名２名称	=	CommonFunction.GetSysValue(SYSsCorporation, "品名２名称");
					SYSs品番制御マスク	=	CommonFunction.GetSysValue(SYSsCorporation, "品番制御マスク");
					SYSs品番名称	=	CommonFunction.GetSysValue(SYSsCorporation, "品番名称");
					SYSs小売単価名称	=	CommonFunction.GetSysValue(SYSsCorporation, "小売単価名称");
					SYSsＳＫＵ制御マスク	=	CommonFunction.GetSysValue(SYSsCorporation, "ＳＫＵ制御マスク");
					SYSsＳＫＵ名称	=	CommonFunction.GetSysValue(SYSsCorporation, "ＳＫＵ名称");
			
					// フェッチコマンド定義
					#region sＳＱＬ
					string sＳＱＬ	=	"SELECT /*+ INDEX (A ＦＣ３００Ｉ０１) */                                      " +
														"       A.法人名称,           A.作成日付,           A.作成時間,                " +
														"       A.ページ,             A.行区分,             A.設定数量小数以下桁数,    " +
														"       A.Ｈ１棚卸日付,       A.Ｈ１店舗セクション, A.Ｈ１店舗セク名,          " +
														"       A.Ｈ１店舗取引先,     A.Ｈ１店舗取引先店,   A.Ｈ１店舗取引先名,        " +
														"       A.Ｈ１ブロック番号,   A.Ｈ１実棚担当者,     A.Ｈ１実棚担当者名,        " +
														"       A.Ｈ１処理日付,       A.Ｈ１出力区分,       A.Ｈ１棚卸方式区分,        " +
														"       A.Ｂ１エラーフラグ,   A.Ｂ１ＳＫＵ,         A.Ｂ１品番,                " +
														"       A.Ｂ１サブ１,         A.Ｂ１サブ２,         A.Ｂ１サブ３,              " +
														"       A.Ｂ１品名１,         A.Ｂ１品名２,         A.Ｂ１実棚数,              " +
														"       A.Ｂ１入出荷数,       A.Ｂ１単位名,         A.Ｂ１売価単価,            " +
														"       A.Ｂ１作成日付,       A.Ｂ１作成時間,       A.Ｂ１エラーメッセージ     " +
														"  FROM ＦＣ３００Ｐ A                                                         " +
														" WHERE A.法人         = '" + SYSsCorporation +                              "'" + 
														"   AND A.スプール番号 = " + SPLiスプール番号.ToString() +
														"   AND A.ページ    BETWEEN  " + REPi開始頁.ToString() +
														"                   AND      " + REPi終了頁.ToString() +
														" ORDER BY ページ, 行番号                                                      ";
					#endregion
					// データリーダー作成
					DataTable dt = PrintReport.GetDataTable(sＳＱＬ);
					// フェッチ処理
					#region for (int j = 0; dt.Rows.Count > j; j++)
					for (int j = 0; dt.Rows.Count > j; j++)
					{
						PFILE.s法人名称									=	dt.Rows[j][0].ToString();
						PFILE.s作成日付									=	dt.Rows[j][1].ToString();
						PFILE.s作成時間									=	dt.Rows[j][2].ToString();
						REPiページ											=	Convert.ToInt32(dt.Rows[j][3].ToString());
						PFILE.s行区分										=	dt.Rows[j][4].ToString();
						PFILE.sＨ１棚卸日付							=	dt.Rows[j][6].ToString();
						PFILE.sＨ１店舗セクション				=	dt.Rows[j][7].ToString();
						PFILE.sＨ１店舗セク名						=	dt.Rows[j][8].ToString();
						PFILE.sＨ１店舗取引先						=	dt.Rows[j][9].ToString();
						PFILE.sＨ１店舗取引先店					=	dt.Rows[j][10].ToString();
						PFILE.sＨ１店舗取引先名					=	dt.Rows[j][11].ToString();
						PFILE.sＨ１ブロック番号					=	dt.Rows[j][12].ToString();
						PFILE.sＨ１実棚担当者						=	dt.Rows[j][13].ToString();
						PFILE.sＨ１実棚担当者名					=	dt.Rows[j][14].ToString();
						PFILE.sＨ１処理日付							=	dt.Rows[j][15].ToString();
						PFILE.nＨ１出力区分							=	(Number)(dt.Rows[j][16].ToString());
						PFILE.nＨ１棚卸方式区分					=	(Number)(dt.Rows[j][17].ToString());
						PFILE.nＢ１エラーフラグ					=	(Number)(dt.Rows[j][18].ToString());
						PFILE.sＢ１ＳＫＵ								=	dt.Rows[j][19].ToString();
						PFILE.sＢ１品番									=	dt.Rows[j][20].ToString();
						PFILE.sＢ１サブ１								=	dt.Rows[j][21].ToString();
						PFILE.sＢ１サブ２								=	dt.Rows[j][22].ToString();
						PFILE.sＢ１サブ３								=	dt.Rows[j][23].ToString();
						PFILE.sＢ１品名１								=	dt.Rows[j][24].ToString();
						PFILE.sＢ１品名２								=	dt.Rows[j][25].ToString();
						PFILE.nＢ１実棚数								=	(Number)(dt.Rows[j][26].ToString());
						PFILE.nＢ１入出荷数							=	(Number)(dt.Rows[j][27].ToString());
						PFILE.sＢ１単位名								=	dt.Rows[j][28].ToString();
						PFILE.nＢ１売価単価							=	(Number)(dt.Rows[j][29].ToString());
						PFILE.sＢ１作成日付							=	dt.Rows[j][30].ToString();
						PFILE.sＢ１作成時間							=	dt.Rows[j][31].ToString();
						PFILE.sＢ１エラーメッセージ			=	dt.Rows[j][32].ToString();
						// 初回・改頁処理
						if (REPiページ != SPLiページ)
						{
							// 初回処理
							if (SPLiページ == 0)
							{
								SYSi帳票数量小数以下桁数		=	Convert.ToInt16(dt.Rows[j][5].ToString());
								// ファイルオープン
								if (PrintReport.OpenXls("NFC300L.XLSX") != true)
								{
									return 32760;
								}
								// 初回ヘッダー内容セット
								if (AM_Hed13(0) == false)
								{
									return 32770;
								}
							}
							// 改頁処理
							else
							{
								// フッター内容セット
								if (AM_Fot13(0) == false)
								{
									return 32772;
								}
								// ヘッダー内容セット
								if (AM_Hed13(0) == false)
								{
									return 32770;
								}
							}
						}
						// 明細処理
						if (AM_Dtl13(0) == false)
						{
							return 32771;
						}
					}
					dt.Dispose();
					#endregion
				// 最終フッター内容セット
				if (AM_Fot13(0) == false)
				{
					return 32772;
				}
			// ＰＤＦ作成
			PrintReport.OutputPDF(sファイル名, "店舗棚卸チェックリスト");
			return 0;
				}
				#endregion
		#region AM_Hed13
		public bool AM_Hed13(int iParam)
		{
			SPLiページ	=	REPiページ;
			SPLi行位置	=	0;
			try
			{
				// 帳票出力処理
				PrintReport.BeginPage("NFC300L");
				// ヘッダー印刷内容セット
				PrintReport.SetValue("**帳票名",                0, CommonFunction.SetTitle("店舗棚卸チェックリスト", string.Empty, 40), false);
				PrintReport.SetValue("**ページ",                0, REPiページ.ToString(), false);
				PrintReport.SetValue("**Ｈ１棚卸日付",          0, CommonFunction.SetDateMask(PFILE.sＨ１棚卸日付, "yyyy/MM/dd"), false);
				PrintReport.SetValue("**店舗セクション",        0, "店舗セクション", false);
				PrintReport.SetValue("**Ｈ１店舗セクション",    0, PFILE.sＨ１店舗セクション, false);
				PrintReport.SetValue("**Ｈ１店舗セクション名",  0, PFILE.sＨ１店舗セク名, false);
				PrintReport.SetValue("**Ｈ１店舗取引先",        0, PFILE.sＨ１店舗取引先, false);
				PrintReport.SetValue("**Ｈ１店舗取引先店",      0, PFILE.sＨ１店舗取引先店, false);
				PrintReport.SetValue("**Ｈ１店舗取引先名",      0, PFILE.sＨ１店舗取引先名, false);
				PrintReport.SetValue("**Ｈ１棚卸ブロック",      0, PFILE.sＨ１ブロック番号, false);
				PrintReport.SetValue("**Ｈ１担当者",            0, PFILE.sＨ１実棚担当者, false);
				PrintReport.SetValue("**Ｈ１担当者名",          0, PFILE.sＨ１実棚担当者名, false);
				if (PFILE.nＨ１棚卸方式区分 != 1)
				{
					PrintReport.SetValue("**Ｈ１処理日付", 0, CommonFunction.SetDateMask(PFILE.sＨ１処理日付, "yyyy/MM/dd"), false);
				}
				else
				{
					PrintReport.SetValue("**Ｈ１処理日付", 0, string.Empty, false);
				}
				if (PFILE.nＨ１出力区分 == 0 )
				{
					PrintReport.SetValue("**Ｈ１出力区分", 0, "( 出力区分：全て )", false);
				}
				else
				{
					PrintReport.SetValue("**Ｈ１出力区分", 0, "( 出力区分：エラーのみ )", false);
				}
				if (PFILE.nＨ１棚卸方式区分 == 2)
				{
					PrintReport.SetValue("**コメント",     0, "( 入出荷数：棚卸日付から処理日付までの入出荷数 )", false);
				}
				else
				{
					PrintReport.SetValue("**コメント",     0, string.Empty, false);
				}
				PrintReport.SetValue("**品番名称",           0, SYSs品番名称, false);
				PrintReport.SetValue("**サブ１名称",         0, SYSsサブ１名称, false);
				PrintReport.SetValue("**サブ２名称",         0, SYSsサブ２名称, false);
				PrintReport.SetValue("**サブ３名称",         0, SYSsサブ３名称, false);
				PrintReport.SetValue("**品名１名称",         0, SYSs品名１名称, false);
				PrintReport.SetValue("**品名２名称",         0, SYSs品名２名称, false);
				if (SYSi単位入力制御区分 == 0)
				{
					PrintReport.SetValue("**単位", 0, string.Empty, false);
				}
				else
				{
					PrintReport.SetValue("**単位", 0, "単位", false);
				}
				PrintReport.SetValue("**ＳＫＵ名称",         0, SYSsＳＫＵ名称, false);
				PrintReport.SetValue("**売価単価",           0, SYSs小売単価名称, false);
				return true;
			}
			catch
			{
				return false;
			}
		}
		#endregion
		#region AM_Dtl13
		public bool AM_Dtl13(int iParam)
		{
			try
			{
				if (PFILE.s行区分 != "H1")
				{
					// ディテール印刷内容セット
					switch (PFILE.s行区分)
					{
						case "B1":
							if (PFILE.nＢ１エラーフラグ != 0)
							{
								PrintReport.SetValue("**Ｂ１エラーフラグ",     SPLi行位置, "*",true);
							}
							else
							{
								PrintReport.SetValue("**Ｂ１エラーフラグ",     SPLi行位置, string.Empty,true);
							}
							PrintReport.SetValue("**Ｂ１ＳＫＵ",           SPLi行位置, CommonFunction.SetStrMask(PFILE.sＢ１ＳＫＵ,         SYSsＳＫＵ制御マスク),true);
							PrintReport.SetValue("**Ｂ１品番",             SPLi行位置, CommonFunction.SetStrMask(PFILE.sＢ１品番,           SYSs品番制御マスク),true);
							PrintReport.SetValue("**Ｂ１サブ１",           SPLi行位置, PFILE.sＢ１サブ１,true);
							PrintReport.SetValue("**Ｂ１サブ２",           SPLi行位置, PFILE.sＢ１サブ２,true);
							PrintReport.SetValue("**Ｂ１サブ３",           SPLi行位置, PFILE.sＢ１サブ３,true);
							PrintReport.SetValue("**Ｂ１品名１",           SPLi行位置, PFILE.sＢ１品名１,true);
							PrintReport.SetValue("**Ｂ１品名２",           SPLi行位置, PFILE.sＢ１品名２,true);
							PrintReport.SetValue("**Ｂ１実棚数",           SPLi行位置, CommonFunction.NumEdit(PFILE.nＢ１実棚数,            SYSi帳票数量小数以下桁数),true);
							if (PFILE.nＨ１棚卸方式区分 == 2)
							{
								PrintReport.SetValue("**Ｂ１入出荷数",       SPLi行位置, CommonFunction.NumEdit(PFILE.nＢ１入出荷数,          SYSi帳票数量小数以下桁数),true);
							}
							else
							{
								PrintReport.SetValue("**Ｂ１入出荷数",         SPLi行位置, string.Empty,true);
							}
							if (SYSi単位入力制御区分 == 0)
							{
								PrintReport.SetValue("**Ｂ１単位", SPLi行位置, string.Empty,true);
							}
							else
							{
								PrintReport.SetValue("**Ｂ１単位", SPLi行位置, PFILE.sＢ１単位名,true);
							}
							PrintReport.SetValue("**Ｂ１売価単価",         SPLi行位置, CommonFunction.NumEdit(PFILE.nＢ１売価単価,          SYSi単価小数以下桁数),true);
							PrintReport.SetValue("**Ｂ１作成日付",         SPLi行位置, CommonFunction.SetDateMask(PFILE.sＢ１作成日付,      "yyyy/MM/dd"),true);
							PrintReport.SetValue("**Ｂ１作成時間",         SPLi行位置, CommonFunction.SetStrMask(PFILE.sＢ１作成時間,       "!!:!!:!!"),true);
							PrintReport.SetValue("**Ｂ１備考",             SPLi行位置, PFILE.sＢ１エラーメッセージ,true);
							break;
						case "T0":
							PrintReport.SetValue("**Ｂ１品名１",   SPLi行位置, " * * * 実棚担当者計 * * * ",true);
							PrintReport.SetPosHorz("**Ｂ１品名１", SPLi行位置, PrintReport.HOLZ.Center);
							PrintReport.SetValue("**Ｂ１実棚数",   SPLi行位置, CommonFunction.NumEdit(PFILE.nＢ１実棚数, SYSi帳票数量小数以下桁数),true);
							if (PFILE.nＨ１棚卸方式区分 == 2)
							{
								PrintReport.SetValue("**Ｂ１入出荷数", SPLi行位置, CommonFunction.NumEdit(PFILE.nＢ１入出荷数, SYSi帳票数量小数以下桁数),true);
							}
							else
							{
								PrintReport.SetValue("**Ｂ１入出荷数", SPLi行位置, string.Empty,true);
							}
							break;
						case "T1":
							PrintReport.SetValue("**Ｂ１品名１",   SPLi行位置, " * * * ブロック計 * * * ",true);
							PrintReport.SetPosHorz("**Ｂ１品名１", SPLi行位置, PrintReport.HOLZ.Center);
							PrintReport.SetValue("**Ｂ１実棚数",   SPLi行位置, CommonFunction.NumEdit(PFILE.nＢ１実棚数, SYSi帳票数量小数以下桁数),true);
							if (PFILE.nＨ１棚卸方式区分 == 2)
							{
								PrintReport.SetValue("**Ｂ１入出荷数", SPLi行位置, CommonFunction.NumEdit(PFILE.nＢ１入出荷数,SYSi帳票数量小数以下桁数),true);
							}
							else
							{
								PrintReport.SetValue("**Ｂ１入出荷数", SPLi行位置, string.Empty,true);
							}
							break;
						case "T2":
							PrintReport.SetValue("**Ｂ１品名１",   SPLi行位置, " * * * セクション計 * * * ",true);
							PrintReport.SetPosHorz("**Ｂ１品名１", SPLi行位置, PrintReport.HOLZ.Center);
							PrintReport.SetValue("**Ｂ１実棚数",   SPLi行位置, CommonFunction.NumEdit(PFILE.nＢ１実棚数, SYSi帳票数量小数以下桁数),true);
							if (PFILE.nＨ１棚卸方式区分 == 2)
							{
								PrintReport.SetValue("**Ｂ１入出荷数", SPLi行位置, CommonFunction.NumEdit(PFILE.nＢ１入出荷数, SYSi帳票数量小数以下桁数),true);
							}
							else
							{
								PrintReport.SetValue("**Ｂ１入出荷数", SPLi行位置, string.Empty,true);
							}
							break;
						case "T3":
							PrintReport.SetValue("**Ｂ１品名１",   SPLi行位置, " * * * 店舗計 * * * ",true);
							PrintReport.SetPosHorz("**Ｂ１品名１", SPLi行位置, PrintReport.HOLZ.Center);
							PrintReport.SetValue("**Ｂ１実棚数",   SPLi行位置, CommonFunction.NumEdit(PFILE.nＢ１実棚数, SYSi帳票数量小数以下桁数),true);
							if (PFILE.nＨ１棚卸方式区分 == 2)
							{
								PrintReport.SetValue("**Ｂ１入出荷数", SPLi行位置, CommonFunction.NumEdit(PFILE.nＢ１入出荷数, SYSi帳票数量小数以下桁数),true);
							}
							else
							{
								PrintReport.SetValue("**Ｂ１入出荷数", SPLi行位置, string.Empty,true);
							}
							break;
					}
					// 罫線
					PrintReport.SetLLine("B10,Z10",  SPLi行位置, PrintReport.LINE.Normal);
					PrintReport.SetLLine("C10:W10",  SPLi行位置, PrintReport.LINE.Slender);
					PrintReport.SetBLine("B10:Y10",  SPLi行位置, PrintReport.LINE.Slender);
					// 色制御
					if (PFILE.s行区分 == "T0" || PFILE.s行区分 == "T1" ||
							PFILE.s行区分 == "T2" || PFILE.s行区分 == "T3")
					{
						PrintReport.SetColor("B10:Y10", SPLi行位置, PrintReport.COLOR.Light);
					}
					// 次の行に移動
					SPLi行位置++;
				}
				return true;
			}
			catch
			{
				return false;
			}
		}
		#endregion
		#region AM_Fot13
		public bool AM_Fot13(int iParam)
		{
			try
			{
				// フッター印刷内容セット
				PrintReport.SetValue("**フッター情報", 0, "[ 作成  " +
																					CommonFunction.SetDateMask(PFILE.s作成日付, "yyyy/MM/dd")       + "  " +
																					CommonFunction.SetStrMask(PFILE.s作成時間,"!!:!!:!!")           + "  " +
																					CommonFunction.NumLPad((Number)SPLiスプール番号, 9, 0)  + " ]",false);
				PrintReport.SetValue("**法人名",       0, PFILE.s法人名称,false);
				// 改ページ時の罫線処理
				PrintReport.SetTLine("B10:Y10",        SPLi行位置, PrintReport.LINE.Normal);
				// 改ページ処理
				PrintReport.EndPage();
				return true;
			}
			catch
			{
				return false;
			}
		}
		#endregion
    }
}
