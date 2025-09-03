/* --------------------------------------------------------------------------------------
 * Name : LonCnrBasEbc.JAVA 
 * VER  : 1.0
 * PROJ : 교보생명 V3 Project
 * Copyright 교보생명보험주식회사 rights reserved.
 * 
 */
package kv3.lon.zz.ebc.rtalon.loncnr.loncnrbas.loncnrbasebi;

import java.util.ArrayList;
import java.math.BigDecimal;
import java.math.RoundingMode;
import devon.core.collection.LData;
import devon.core.collection.LMultiData;
import devon.core.exception.DevonException;
import devon.core.exception.LException;
import devon.core.exception.LBizException;
import devon.core.exception.LSysException;
import devon.core.log.LLog;
import devon.core.util.file.LFileUtil;
import devonframework.service.message.LMessage;
import devonframework.persistent.autodao.LCommonDao;
import devonframework.persistent.autodao.LMultiDao;
import devonframework.persistent.autodao.LAddBatchDao;
import devon.scp.service.nestedtx.NestedTx;
import kv3.core.util.MessageUtil;
import devon.scp.core.context.ContextHandler;
import devon.scp.service.paging.LPagingUtil;
import devon.core.collection.LPagingData;
import devon.scp.service.paging.vo.LIndexPagingVO;
import devon.scp.service.paging.vo.LScrollPagingVO;
import devon.scp.service.paging.vo.LRownumHandlingPagingVO;
import devon.scp.core.collection.util.LProtocolInitializeUtil;
import devon.scp.service.paging.LFPagingConstants;
import kv3.core.exception.BizException;
import kv3.core.exception.LInfMessageException;
import kv3.core.exception.LBizDuplicateException;
import kv3.core.exception.LBizExceptionMessage;
import kv3.core.exception.LBizNotAffectedException;
import kv3.core.exception.LBizNotFoundException;
import kv3.core.exception.LBizTooManyRowException;
import kv3.business.link.LServiceLink;
import devon.scp.service.paging.LPagingCommonDao;
import kv3.persistent.external.CommonSao;
import devon.scp.persistent.externalinterface.LCommonSao;
import kv3.util.KLDataConvertUtil;
import devon.core.exception.LDuplicateException;
import devonframework.persistent.autodao.LNotFoundException;
import devonframework.persistent.autodao.LTooManyRowException;
import kv3.common.syscomm.constants.*;
import kv3.util.KTypeConverter;
import kv3.util.KDBCryptUtil;
import kv3.util.KAuditColumnUtil;

/**
 * 
 *
 * @logicalName   여신계약기본Ebi
 * @version       1.0, 2022-08-16
 * @modelVersion  
 * @modelProject  KV3_MDL_LON_ZZ(여신공통)
 * @fullPath      2.시스템명세모델::05.엔터티컴포넌트::소매여신::여신계약::여신계약기본::여신계약기본Ebi::여신계약기본Ebi
 */
public class LonCnrBasEbc {
	/**
	 * 
	 *
	 * @designSeq     
	 * @serviceID     
	 * @logicalName   수납예상업체목록조회
	 * @param LData iRcvExpcEntListInq i수납예상업체목록조회
	 * @return LMultiData rRcvExpcEntListInq r수납예상업체목록조회
	 * @exception     LException occurs error 
	 * @modelProject  KV3_MDL_LON_ZZ(여신공통)
	 * @fullPath      2.시스템명세모델::05.엔터티컴포넌트::소매여신::여신계약::여신계약기본::여신계약기본Ebi::CORA_여신계약기본Ebi::ACSD_수납예상업체목록조회
	 * 
	 */
	public LMultiData retvLstRcvExpcEnt(LData iRcvExpcEntListInq)
			throws LException {
		//#Return 변수 선언 및 초기화
		LMultiData rRcvExpcEntListInq = new LMultiData(); //# r수납예상업체목록조회
		//#호출 오퍼레이션에서 사용된 파라미터 초기화
		LPagingCommonDao pagingDao;
		// Paging Parameter 처리
		LPagingUtil.setIndexPageInfo(iRcvExpcEntListInq,
				iRcvExpcEntListInq.getInt("page_no"),
				iRcvExpcEntListInq.getInt("page_size"));
		pagingDao = new LPagingCommonDao(
				"lon/zz/rtalon/loncnr/loncnrbas/loncnrbasebi/LonCnrBas/retvLstRcvExpcEnt",
				iRcvExpcEntListInq); //##수납예상업체목록조회
		rRcvExpcEntListInq = pagingDao.executeQueryForIndexPage();
		LProtocolInitializeUtil.primitiveLMultiInitialize(rRcvExpcEntListInq);
		return rRcvExpcEntListInq;
	}

	/**
	 * 
	 *
	 * @designSeq     
	 * @serviceID     
	 * @logicalName   여신개인고객당사거래집계조회
	 * @param LData iLonIdlCsOcoDlnTtInq i여신개인고객당사거래집계조회
	 * @return LData rLonIdlCsOcoDlnTtInq r여신개인고객당사거래집계조회
	 * @exception     LException occurs error 
	 * @modelProject  KV3_MDL_LON_ZZ(여신공통)
	 * @fullPath      2.시스템명세모델::05.엔터티컴포넌트::소매여신::여신계약::여신계약기본::여신계약기본Ebi::CORA_여신계약기본Ebi::ACSD_여신개인고객당사거래집계조회
	 * 
	 */
	public LData retvLonIdlCsOcoDlnTt(LData iLonIdlCsOcoDlnTtInq)
			throws LException {
		//#Return 변수 선언 및 초기화
		LData rLonIdlCsOcoDlnTtInq = new LData(); //# r여신개인고객당사거래집계조회
		//#호출 오퍼레이션에서 사용된 파라미터 초기화
		LCommonDao commonDao;
		try {
			commonDao = new LCommonDao(
					"lon/zz/rtalon/loncnr/loncnrbas/loncnrbasebi/LonCnrBas/retvLonIdlCsOcoDlnTt",
					iLonIdlCsOcoDlnTtInq); //##여신개인고객당사거래집계조회
			rLonIdlCsOcoDlnTtInq = commonDao.executeQueryOnlySingle();
		} catch (LNotFoundException e) {
			throw new LBizNotFoundException(CommConst.MG_NOT_FOUND.getCode(), e);
		} catch (LTooManyRowException e) {
			throw new LBizTooManyRowException(
					CommConst.MG_TOO_MANY_ROW.getCode(), e);
		}
		LProtocolInitializeUtil.primitiveLMultiInitialize(rLonIdlCsOcoDlnTtInq);
		return rLonIdlCsOcoDlnTtInq;
	}

	/**
	 * 
	 *
	 * @designSeq     
	 * @serviceID     
	 * @logicalName   여신개인고객당사거래현황목록조회
	 * @param LData iLonIdlCsOcoDlnPrcnListInq i여신개인고객당사거래현황목록조회
	 * @return LMultiData rLonIdlCsOcoDlnPrcnListInq r여신개인고객당사거래현황목록조회
	 * @exception     LException occurs error 
	 * @modelProject  KV3_MDL_LON_ZZ(여신공통)
	 * @fullPath      2.시스템명세모델::05.엔터티컴포넌트::소매여신::여신계약::여신계약기본::여신계약기본Ebi::CORA_여신계약기본Ebi::ACSD_여신개인고객당사거래현황목록조회
	 * 
	 */
	public LMultiData retvLstLonIdlCsOcoDlnPrcn(LData iLonIdlCsOcoDlnPrcnListInq)
			throws LException {
		//#Return 변수 선언 및 초기화
		LMultiData rLonIdlCsOcoDlnPrcnListInq = new LMultiData(); //# r여신개인고객당사거래현황목록조회
		//#호출 오퍼레이션에서 사용된 파라미터 초기화
		LPagingCommonDao pagingDao;
		// Paging Parameter 처리
		LPagingUtil.setIndexPageInfo(iLonIdlCsOcoDlnPrcnListInq,
				iLonIdlCsOcoDlnPrcnListInq.getInt("page_no"),
				iLonIdlCsOcoDlnPrcnListInq.getInt("page_size"));
		pagingDao = new LPagingCommonDao(
				"lon/zz/rtalon/loncnr/loncnrbas/loncnrbasebi/LonCnrBas/retvLstLonIdlCsOcoDlnPrcn",
				iLonIdlCsOcoDlnPrcnListInq); //##여신개인고객당사거래현황목록조회
		rLonIdlCsOcoDlnPrcnListInq = pagingDao.executeQueryForIndexPage();
		LProtocolInitializeUtil
				.primitiveLMultiInitialize(rLonIdlCsOcoDlnPrcnListInq);
		return rLonIdlCsOcoDlnPrcnListInq;
	}

	/**
	 * 
	 *
	 * @designSeq     
	 * @serviceID     
	 * @logicalName   여신계약기본[대출번호]목록조회
	 * @param LData iLonCnrBasLnNoListInq i여신계약기본대출번호목록조회
	 * @return LMultiData rLonCnrBasLnNoListInq r여신계약기본대출번호목록조회
	 * @exception     LException occurs error 
	 * @modelProject  KV3_MDL_LON_ZZ(여신공통)
	 * @fullPath      2.시스템명세모델::05.엔터티컴포넌트::소매여신::여신계약::여신계약기본::여신계약기본Ebi::CORA_여신계약기본Ebi::ACSD_여신계약기본[대출번호]목록조회
	 * 
	 */
	public LMultiData retvLstLonCnrBasByLnNo(LData iLonCnrBasLnNoListInq)
			throws LException {
		//#Return 변수 선언 및 초기화
		LMultiData rLonCnrBasLnNoListInq = new LMultiData(); //# r여신계약기본대출번호목록조회
		//#호출 오퍼레이션에서 사용된 파라미터 초기화
		LCommonDao commonDao;
		commonDao = new LCommonDao(
				"lon/zz/rtalon/loncnr/loncnrbas/loncnrbasebi/TB_CTL1001/retvLstLonCnrBasByLnNo",
				iLonCnrBasLnNoListInq); //##여신계약기본[대출번호]목록조회
		rLonCnrBasLnNoListInq = commonDao.executeQuery();
		LProtocolInitializeUtil
				.primitiveLMultiInitialize(rLonCnrBasLnNoListInq);
		return rLonCnrBasLnNoListInq;
	}

	/**
	 * 
	 *
	 * @designSeq     
	 * @serviceID     
	 * @logicalName   여신계약기본[매각]목록조회
	 * @param LData iLonCnrBasSelListInq i여신계약기본매각목록조회
	 * @return LMultiData rLonCnrBasSelListInq r여신계약기본매각목록조회
	 * @exception     LException occurs error 
	 * @modelProject  KV3_MDL_LON_ZZ(여신공통)
	 * @fullPath      2.시스템명세모델::05.엔터티컴포넌트::소매여신::여신계약::여신계약기본::여신계약기본Ebi::CORA_여신계약기본Ebi::ACSD_여신계약기본[매각]목록조회
	 * 
	 */
	public LMultiData retvLstLonCnrBasBySel(LData iLonCnrBasSelListInq)
			throws LException {
		//#Return 변수 선언 및 초기화
		LMultiData rLonCnrBasSelListInq = new LMultiData(); //# r여신계약기본매각목록조회
		//#호출 오퍼레이션에서 사용된 파라미터 초기화
		LCommonDao commonDao;
		commonDao = new LCommonDao(
				"lon/zz/rtalon/loncnr/loncnrbas/loncnrbasebi/TB_CTL1001/retvLstLonCnrBasBySel",
				iLonCnrBasSelListInq); //##여신계약기본[매각]목록조회
		rLonCnrBasSelListInq = commonDao.executeQuery();
		LProtocolInitializeUtil.primitiveLMultiInitialize(rLonCnrBasSelListInq);
		return rLonCnrBasSelListInq;
	}

	/**
	 * 
	 *
	 * @designSeq     
	 * @serviceID     
	 * @logicalName   여신계약기본[여신상담ID]목록조회
	 * @param LData iLonCnrBasLonCslIdListInq i여신계약기본여신상담ID목록조회
	 * @return LMultiData rLonCnrBasLonCslIdListInq r여신계약기본여신상담ID목록조회
	 * @exception     LException occurs error 
	 * @modelProject  KV3_MDL_LON_ZZ(여신공통)
	 * @fullPath      2.시스템명세모델::05.엔터티컴포넌트::소매여신::여신계약::여신계약기본::여신계약기본Ebi::CORA_여신계약기본Ebi::ACSD_여신계약기본[여신상담ID]목록조회
	 * 
	 */
	public LMultiData retvLstLonCnrBasByLonCslId(LData iLonCnrBasLonCslIdListInq)
			throws LException {
		//#Return 변수 선언 및 초기화
		LMultiData rLonCnrBasLonCslIdListInq = new LMultiData(); //# r여신계약기본여신상담ID목록조회
		//#호출 오퍼레이션에서 사용된 파라미터 초기화
		LCommonDao commonDao;
		commonDao = new LCommonDao(
				"lon/zz/rtalon/loncnr/loncnrbas/loncnrbasebi/TB_CTL1001/retvLstLonCnrBasByLonCslId",
				iLonCnrBasLonCslIdListInq); //##여신계약기본[여신상담ID]목록조회
		rLonCnrBasLonCslIdListInq = commonDao.executeQuery();
		LProtocolInitializeUtil
				.primitiveLMultiInitialize(rLonCnrBasLonCslIdListInq);
		return rLonCnrBasLonCslIdListInq;
	}

	/**
	 * 
	 *
	 * @designSeq     
	 * @serviceID     
	 * @logicalName   여신계약기본[여신접수번호]목록조회
	 * @param LData iLonCnrBasLonRcpNoListInq i여신계약기본여신접수번호목록조회
	 * @return LMultiData rLonCnrBasLonRcpNoListInq r여신계약기본여신접수번호목록조회
	 * @exception     LException occurs error 
	 * @modelProject  KV3_MDL_LON_ZZ(여신공통)
	 * @fullPath      2.시스템명세모델::05.엔터티컴포넌트::소매여신::여신계약::여신계약기본::여신계약기본Ebi::CORA_여신계약기본Ebi::ACSD_여신계약기본[여신접수번호]목록조회
	 * 
	 */
	public LMultiData retvLstLonCnrBasByLonRcpNo(LData iLonCnrBasLonRcpNoListInq)
			throws LException {
		//#Return 변수 선언 및 초기화
		LMultiData rLonCnrBasLonRcpNoListInq = new LMultiData(); //# r여신계약기본여신접수번호목록조회
		//#호출 오퍼레이션에서 사용된 파라미터 초기화
		LCommonDao commonDao;
		commonDao = new LCommonDao(
				"lon/zz/rtalon/loncnr/loncnrbas/loncnrbasebi/TB_CTL1001/retvLstLonCnrBasByLonRcpNo",
				iLonCnrBasLonRcpNoListInq); //##여신계약기본[여신접수번호]목록조회
		rLonCnrBasLonRcpNoListInq = commonDao.executeQuery();
		LProtocolInitializeUtil
				.primitiveLMultiInitialize(rLonCnrBasLonRcpNoListInq);
		return rLonCnrBasLonRcpNoListInq;
	}

	/**
	 * 
	 *
	 * @designSeq     
	 * @serviceID     
	 * @logicalName   여신계약기본[최초여신상담ID]목록조회
	 * @param LData iLonCnrBasFsLonCslIdListInq i여신계약기본최초여신상담ID목록조회
	 * @return LMultiData rLonCnrBasFsLonCslIdListInq r여신계약기본최초여신상담ID목록조회
	 * @exception     LException occurs error 
	 * @modelProject  KV3_MDL_LON_ZZ(여신공통)
	 * @fullPath      2.시스템명세모델::05.엔터티컴포넌트::소매여신::여신계약::여신계약기본::여신계약기본Ebi::CORA_여신계약기본Ebi::ACSD_여신계약기본[최초여신상담ID]목록조회
	 * 
	 */
	public LMultiData retvLstLonCnrBasByFsLonCslId(
			LData iLonCnrBasFsLonCslIdListInq) throws LException {
		//#Return 변수 선언 및 초기화
		LMultiData rLonCnrBasFsLonCslIdListInq = new LMultiData(); //# r여신계약기본최초여신상담ID목록조회
		//#호출 오퍼레이션에서 사용된 파라미터 초기화
		LCommonDao commonDao;
		commonDao = new LCommonDao(
				"lon/zz/rtalon/loncnr/loncnrbas/loncnrbasebi/TB_CTL1001/retvLstLonCnrBasByFsLonCslId",
				iLonCnrBasFsLonCslIdListInq); //##여신계약기본[최초여신상담ID]목록조회
		rLonCnrBasFsLonCslIdListInq = commonDao.executeQuery();
		LProtocolInitializeUtil
				.primitiveLMultiInitialize(rLonCnrBasFsLonCslIdListInq);
		return rLonCnrBasFsLonCslIdListInq;
	}

	/**
	 * 
	 *
	 * @designSeq     
	 * @serviceID     
	 * @logicalName   여신계약기본[통합고객번호]목록조회
	 * @param LData iLonCnrBasIgCsNoListInq i여신계약기본통합고객번호목록조회
	 * @return LMultiData rLonCnrBasIgCsNoListInq r여신계약기본통합고객번호목록조회
	 * @exception     LException occurs error 
	 * @modelProject  KV3_MDL_LON_ZZ(여신공통)
	 * @fullPath      2.시스템명세모델::05.엔터티컴포넌트::소매여신::여신계약::여신계약기본::여신계약기본Ebi::CORA_여신계약기본Ebi::ACSD_여신계약기본[통합고객번호]목록조회
	 * 
	 */
	public LMultiData retvLstLonCnrBasByIgCsNo(LData iLonCnrBasIgCsNoListInq)
			throws LException {
		//#Return 변수 선언 및 초기화
		LMultiData rLonCnrBasIgCsNoListInq = new LMultiData(); //# r여신계약기본통합고객번호목록조회
		//#호출 오퍼레이션에서 사용된 파라미터 초기화
		LCommonDao commonDao;
		commonDao = new LCommonDao(
				"lon/zz/rtalon/loncnr/loncnrbas/loncnrbasebi/TB_CTL1001/retvLstLonCnrBasByIgCsNo",
				iLonCnrBasIgCsNoListInq); //##여신계약기본[통합고객번호]목록조회
		rLonCnrBasIgCsNoListInq = commonDao.executeQuery();
		LProtocolInitializeUtil
				.primitiveLMultiInitialize(rLonCnrBasIgCsNoListInq);
		return rLonCnrBasIgCsNoListInq;
	}

	/**
	 * 
	 *
	 * @designSeq     
	 * @serviceID     
	 * @logicalName   여신계약기본당사대출금액조회
	 * @param LData iLonCnrBasOcoLnAmtInq i여신계약기본당사대출금액조회
	 * @return LData rLonCnrBasOcoLnAmtInq r여신계약기본당사대출금액조회
	 * @exception     LException occurs error 
	 * @modelProject  KV3_MDL_LON_ZZ(여신공통)
	 * @fullPath      2.시스템명세모델::05.엔터티컴포넌트::소매여신::여신계약::여신계약기본::여신계약기본Ebi::CORA_여신계약기본Ebi::ACSD_여신계약기본당사대출금액조회
	 * 
	 */
	public LData retvLonCnrBasOcoLnAmt(LData iLonCnrBasOcoLnAmtInq)
			throws LException {
		//#Return 변수 선언 및 초기화
		LData rLonCnrBasOcoLnAmtInq = new LData(); //# r여신계약기본당사대출금액조회
		//#호출 오퍼레이션에서 사용된 파라미터 초기화
		LCommonDao commonDao;
		try {
			commonDao = new LCommonDao(
					"lon/zz/rtalon/loncnr/loncnrbas/loncnrbasebi/TB_CTL1001/retvLonCnrBasOcoLnAmt",
					iLonCnrBasOcoLnAmtInq); //##여신계약기본당사대출금액조회
			rLonCnrBasOcoLnAmtInq = commonDao.executeQueryOnlySingle();
		} catch (LNotFoundException e) {
			throw new LBizNotFoundException(CommConst.MG_NOT_FOUND.getCode(), e);
		} catch (LTooManyRowException e) {
			throw new LBizTooManyRowException(
					CommConst.MG_TOO_MANY_ROW.getCode(), e);
		}
		LProtocolInitializeUtil
				.primitiveLMultiInitialize(rLonCnrBasOcoLnAmtInq);
		return rLonCnrBasOcoLnAmtInq;
	}

	/**
	 * 
	 *
	 * @designSeq     
	 * @serviceID     
	 * @logicalName   여신계약기본등록
	 * @param LData iLonCnrBasReg i여신계약기본등록
	 * @return long rLonCnrBasReg r여신계약기본등록 
	 * @exception     LException occurs error 
	 * @modelProject  KV3_MDL_LON_ZZ(여신공통)
	 * @fullPath      2.시스템명세모델::05.엔터티컴포넌트::소매여신::여신계약::여신계약기본::여신계약기본Ebi::CORA_여신계약기본Ebi::ACSD_여신계약기본등록
	 * 
	 */
	public long regtLonCnrBas(LData iLonCnrBasReg) throws LException {
		//#Return 변수 선언 및 초기화
		long rLonCnrBasReg = 0; //# r여신계약기본등록
		//#호출 오퍼레이션에서 사용된 파라미터 초기화
		LCommonDao commonDao;
		try {
			commonDao = new LCommonDao(
					"lon/zz/rtalon/loncnr/loncnrbas/loncnrbasebi/TB_CTL1001/regtLonCnrBas",
					iLonCnrBasReg); //##여신계약기본등록
			rLonCnrBasReg = commonDao.executeUpdate();
			if (rLonCnrBasReg == 0) {
				throw new LBizNotAffectedException(
						CommConst.MG_NOT_AFFECTED.getCode());
			}
		} catch (LDuplicateException e) {
			throw new LBizDuplicateException(CommConst.MG_DUPLICATE.getCode(),
					e);
		}
		return rLonCnrBasReg;
	}

	/**
	 * 
	 *
	 * @designSeq     
	 * @serviceID     
	 * @logicalName   여신계약기본락조회
	 * @param LData iLonCnrBasLckInq i여신계약기본락조회
	 * @return LData rLonCnrBasLckInq r여신계약기본락조회
	 * @exception     LException occurs error 
	 * @modelProject  KV3_MDL_LON_ZZ(여신공통)
	 * @fullPath      2.시스템명세모델::05.엔터티컴포넌트::소매여신::여신계약::여신계약기본::여신계약기본Ebi::CORA_여신계약기본Ebi::ACSD_여신계약기본락조회
	 * 
	 */
	public LData retvLckLonCnrBas(LData iLonCnrBasLckInq) throws LException {
		//#Return 변수 선언 및 초기화
		LData rLonCnrBasLckInq = new LData(); //# r여신계약기본락조회
		//#호출 오퍼레이션에서 사용된 파라미터 초기화
		LCommonDao commonDao;
		try {
			commonDao = new LCommonDao(
					"lon/zz/rtalon/loncnr/loncnrbas/loncnrbasebi/TB_CTL1001/retvLckLonCnrBas",
					iLonCnrBasLckInq); //##여신계약기본락조회
			rLonCnrBasLckInq = commonDao.executeQueryOnlySingle();
		} catch (LNotFoundException e) {
			throw new LBizNotFoundException(CommConst.MG_NOT_FOUND.getCode(), e);
		} catch (LTooManyRowException e) {
			throw new LBizTooManyRowException(
					CommConst.MG_TOO_MANY_ROW.getCode(), e);
		}
		LProtocolInitializeUtil.primitiveLMultiInitialize(rLonCnrBasLckInq);
		return rLonCnrBasLckInq;
	}

	/**
	 * 
	 *
	 * @designSeq     
	 * @serviceID     
	 * @logicalName   여신계약기본수정
	 * @param LData iLonCnrBasUpd i여신계약기본수정
	 * @return long rLonCnrBasUpd r여신계약기본수정 
	 * @exception     LException occurs error 
	 * @modelProject  KV3_MDL_LON_ZZ(여신공통)
	 * @fullPath      2.시스템명세모델::05.엔터티컴포넌트::소매여신::여신계약::여신계약기본::여신계약기본Ebi::CORA_여신계약기본Ebi::ACSD_여신계약기본수정
	 * 
	 */
	public long uptLonCnrBas(LData iLonCnrBasUpd) throws LException {
		//#Return 변수 선언 및 초기화
		long rLonCnrBasUpd = 0; //# r여신계약기본수정
		//#호출 오퍼레이션에서 사용된 파라미터 초기화
		LCommonDao commonDao;
		commonDao = new LCommonDao(
				"lon/zz/rtalon/loncnr/loncnrbas/loncnrbasebi/TB_CTL1001/uptLonCnrBas",
				iLonCnrBasUpd); //##여신계약기본수정
		rLonCnrBasUpd = commonDao.executeUpdate();
		if (rLonCnrBasUpd == 0) {
			throw new LBizNotAffectedException(
					CommConst.MG_NOT_AFFECTED.getCode());
		}
		return rLonCnrBasUpd;
	}

	/**
	 * 
	 *
	 * @designSeq     
	 * @serviceID     
	 * @logicalName   여신계약기본입고결재수정
	 * @param LData iLonCnrBasWrhsSncUpd i여신계약기본입고결재수정
	 * @return long rLonCnrBasWrhsSncUpd r여신계약기본입고결재수정 
	 * @exception     LException occurs error 
	 * @modelProject  KV3_MDL_LON_ZZ(여신공통)
	 * @fullPath      2.시스템명세모델::05.엔터티컴포넌트::소매여신::여신계약::여신계약기본::여신계약기본Ebi::CORA_여신계약기본Ebi::ACSD_여신계약기본입고결재수정
	 * 
	 */
	public long uptLonCnrBasWrhsSnc(LData iLonCnrBasWrhsSncUpd)
			throws LException {
		//#Return 변수 선언 및 초기화
		long rLonCnrBasWrhsSncUpd = 0; //# r여신계약기본입고결재수정
		//#호출 오퍼레이션에서 사용된 파라미터 초기화
		LCommonDao commonDao;
		commonDao = new LCommonDao(
				"lon/zz/rtalon/loncnr/loncnrbas/loncnrbasebi/TB_CTL1001/uptLonCnrBasWrhsSnc",
				iLonCnrBasWrhsSncUpd); //##여신계약기본입고결재수정
		rLonCnrBasWrhsSncUpd = commonDao.executeUpdate();
		if (rLonCnrBasWrhsSncUpd == 0) {
			throw new LBizNotAffectedException(
					CommConst.MG_NOT_AFFECTED.getCode());
		}
		return rLonCnrBasWrhsSncUpd;
	}

	/**
	 * 
	 *
	 * @designSeq     
	 * @serviceID     
	 * @logicalName   여신계약기본조회
	 * @param LData iLonCnrBasInq i여신계약기본조회
	 * @return LData rLonCnrBasInq r여신계약기본조회
	 * @exception     LException occurs error 
	 * @modelProject  KV3_MDL_LON_ZZ(여신공통)
	 * @fullPath      2.시스템명세모델::05.엔터티컴포넌트::소매여신::여신계약::여신계약기본::여신계약기본Ebi::CORA_여신계약기본Ebi::ACSD_여신계약기본조회
	 * 
	 */
	public LData retvLonCnrBas(LData iLonCnrBasInq) throws LException {
		//#Return 변수 선언 및 초기화
		LData rLonCnrBasInq = new LData(); //# r여신계약기본조회
		//#호출 오퍼레이션에서 사용된 파라미터 초기화
		LCommonDao commonDao;
		try {
			commonDao = new LCommonDao(
					"lon/zz/rtalon/loncnr/loncnrbas/loncnrbasebi/TB_CTL1001/retvLonCnrBas",
					iLonCnrBasInq); //##여신계약기본조회
			rLonCnrBasInq = commonDao.executeQueryOnlySingle();
		} catch (LNotFoundException e) {
			throw new LBizNotFoundException(CommConst.MG_NOT_FOUND.getCode(), e);
		} catch (LTooManyRowException e) {
			throw new LBizTooManyRowException(
					CommConst.MG_TOO_MANY_ROW.getCode(), e);
		}
		LProtocolInitializeUtil.primitiveLMultiInitialize(rLonCnrBasInq);
		return rLonCnrBasInq;
	}

	/**
	 * 
	 *
	 * @designSeq     
	 * @serviceID     
	 * @logicalName   여신계약기본채권서류[보유조직]수정
	 * @param LData iLonCnrBasBdPprHldOrzUpd i여신계약기본채권서류보유조직수정
	 * @return long rLonCnrBasBdPprHldOrzUpd r여신계약기본채권서류보유조직수정 
	 * @exception     LException occurs error 
	 * @modelProject  KV3_MDL_LON_ZZ(여신공통)
	 * @fullPath      2.시스템명세모델::05.엔터티컴포넌트::소매여신::여신계약::여신계약기본::여신계약기본Ebi::CORA_여신계약기본Ebi::ACSD_여신계약기본채권서류[보유조직]수정
	 * 
	 */
	public long uptLonCnrBasBdPprByHldOrz(LData iLonCnrBasBdPprHldOrzUpd)
			throws LException {
		//#Return 변수 선언 및 초기화
		long rLonCnrBasBdPprHldOrzUpd = 0; //# r여신계약기본채권서류보유조직수정
		//#호출 오퍼레이션에서 사용된 파라미터 초기화
		LCommonDao commonDao;
		commonDao = new LCommonDao(
				"lon/zz/rtalon/loncnr/loncnrbas/loncnrbasebi/TB_CTL1001/uptLonCnrBasBdPprByHldOrz",
				iLonCnrBasBdPprHldOrzUpd); //##여신계약기본채권서류[보유조직]수정
		rLonCnrBasBdPprHldOrzUpd = commonDao.executeUpdate();
		if (rLonCnrBasBdPprHldOrzUpd == 0) {
			throw new LBizNotAffectedException(
					CommConst.MG_NOT_AFFECTED.getCode());
		}
		return rLonCnrBasBdPprHldOrzUpd;
	}

	/**
	 * 
	 *
	 * @designSeq     
	 * @serviceID     
	 * @logicalName   여신계약기본페이징[통합고객번호]목록조회
	 * @param LData iLonCnrBasPagiIgCsNoListInq i여신계약기본페이징통합고객번호목록조회
	 * @return LMultiData rLonCnrBasPagiIgCsNoListInq r여신계약기본페이징통합고객번호목록조회
	 * @exception     LException occurs error 
	 * @modelProject  KV3_MDL_LON_ZZ(여신공통)
	 * @fullPath      2.시스템명세모델::05.엔터티컴포넌트::소매여신::여신계약::여신계약기본::여신계약기본Ebi::CORA_여신계약기본Ebi::ACSD_여신계약기본페이징[통합고객번호]목록조회
	 * 
	 */
	public LMultiData retvLstLonCnrBasPagiByIgCsNo(
			LData iLonCnrBasPagiIgCsNoListInq) throws LException {
		//#Return 변수 선언 및 초기화
		LMultiData rLonCnrBasPagiIgCsNoListInq = new LMultiData(); //# r여신계약기본페이징통합고객번호목록조회
		//#호출 오퍼레이션에서 사용된 파라미터 초기화
		LPagingCommonDao pagingDao;
		// Paging Parameter 처리
		LPagingUtil.setIndexPageInfo(iLonCnrBasPagiIgCsNoListInq,
				iLonCnrBasPagiIgCsNoListInq.getInt("page_no"),
				iLonCnrBasPagiIgCsNoListInq.getInt("page_size"));
		pagingDao = new LPagingCommonDao(
				"lon/zz/rtalon/loncnr/loncnrbas/loncnrbasebi/TB_CTL1001/retvLstLonCnrBasPagiByIgCsNo",
				iLonCnrBasPagiIgCsNoListInq); //##여신계약기본페이징[통합고객번호]목록조회
		rLonCnrBasPagiIgCsNoListInq = pagingDao.executeQueryForIndexPage();
		LProtocolInitializeUtil
				.primitiveLMultiInitialize(rLonCnrBasPagiIgCsNoListInq);
		return rLonCnrBasPagiIgCsNoListInq;
	}

	/**
	 * 
	 *
	 * @designSeq     
	 * @serviceID     
	 * @logicalName   여신계약기본한도[대출번호]조회
	 * @param LData iLonCnrBasLmLnNoInq i여신계약기본한도대출번호조회
	 * @return LData rLonCnrBasLmLnNoInq r여신계약기본한도대출번호조회
	 * @exception     LException occurs error 
	 * @modelProject  KV3_MDL_LON_ZZ(여신공통)
	 * @fullPath      2.시스템명세모델::05.엔터티컴포넌트::소매여신::여신계약::여신계약기본::여신계약기본Ebi::CORA_여신계약기본Ebi::ACSD_여신계약기본한도[대출번호]조회
	 * 
	 */
	public LData retvLonCnrBasLmByLnNo(LData iLonCnrBasLmLnNoInq)
			throws LException {
		//#Return 변수 선언 및 초기화
		LData rLonCnrBasLmLnNoInq = new LData(); //# r여신계약기본한도대출번호조회
		//#호출 오퍼레이션에서 사용된 파라미터 초기화
		LCommonDao commonDao;
		try {
			commonDao = new LCommonDao(
					"lon/zz/rtalon/loncnr/loncnrbas/loncnrbasebi/TB_CTL1001/retvLonCnrBasLmByLnNo",
					iLonCnrBasLmLnNoInq); //##여신계약기본한도[대출번호]조회
			rLonCnrBasLmLnNoInq = commonDao.executeQueryOnlySingle();
		} catch (LNotFoundException e) {
			throw new LBizNotFoundException(CommConst.MG_NOT_FOUND.getCode(), e);
		} catch (LTooManyRowException e) {
			throw new LBizTooManyRowException(
					CommConst.MG_TOO_MANY_ROW.getCode(), e);
		}
		LProtocolInitializeUtil.primitiveLMultiInitialize(rLonCnrBasLmLnNoInq);
		return rLonCnrBasLmLnNoInq;
	}

	/**
	 * 
	 *
	 * @designSeq     
	 * @serviceID     
	 * @logicalName   여신계약대출번호조회
	 * @param LData iLonCnrLnNoInq i여신계약대출번호조회
	 * @return LData rLonCnrLnNoInq r여신계약대출번호조회
	 * @exception     LException occurs error 
	 * @modelProject  KV3_MDL_LON_ZZ(여신공통)
	 * @fullPath      2.시스템명세모델::05.엔터티컴포넌트::소매여신::여신계약::여신계약기본::여신계약기본Ebi::CORA_여신계약기본Ebi::ACSD_여신계약대출번호조회
	 * 
	 */
	public LData retvLonCnrLnNo(LData iLonCnrLnNoInq) throws LException {
		//#Return 변수 선언 및 초기화
		LData rLonCnrLnNoInq = new LData(); //# r여신계약대출번호조회
		//#호출 오퍼레이션에서 사용된 파라미터 초기화
		LCommonDao commonDao;
		try {
			commonDao = new LCommonDao(
					"lon/zz/rtalon/loncnr/loncnrbas/loncnrbasebi/TB_CTL1001/retvLonCnrLnNo",
					iLonCnrLnNoInq); //##여신계약대출번호조회
			rLonCnrLnNoInq = commonDao.executeQueryOnlySingle();
		} catch (LNotFoundException e) {
			throw new LBizNotFoundException(CommConst.MG_NOT_FOUND.getCode(), e);
		} catch (LTooManyRowException e) {
			throw new LBizTooManyRowException(
					CommConst.MG_TOO_MANY_ROW.getCode(), e);
		}
		LProtocolInitializeUtil.primitiveLMultiInitialize(rLonCnrLnNoInq);
		return rLonCnrLnNoInq;
	}

	/**
	 * 
	 *
	 * @designSeq     
	 * @serviceID     
	 * @logicalName   여신사업자고객당사거래집계조회
	 * @param LData iLonBsmCsOcoDlnTtInq i여신사업자고객당사거래집계조회
	 * @return LData rLonBsmCsOcoDlnTtInq r여신사업자고객당사거래집계조회
	 * @exception     LException occurs error 
	 * @modelProject  KV3_MDL_LON_ZZ(여신공통)
	 * @fullPath      2.시스템명세모델::05.엔터티컴포넌트::소매여신::여신계약::여신계약기본::여신계약기본Ebi::CORA_여신계약기본Ebi::ACSD_여신사업자고객당사거래집계조회
	 * 
	 */
	public LData retvLonBsmCsOcoDlnTt(LData iLonBsmCsOcoDlnTtInq)
			throws LException {
		//#Return 변수 선언 및 초기화
		LData rLonBsmCsOcoDlnTtInq = new LData(); //# r여신사업자고객당사거래집계조회
		//#호출 오퍼레이션에서 사용된 파라미터 초기화
		LCommonDao commonDao;
		try {
			commonDao = new LCommonDao(
					"lon/zz/rtalon/loncnr/loncnrbas/loncnrbasebi/LonCnrBas/retvLonBsmCsOcoDlnTt",
					iLonBsmCsOcoDlnTtInq); //##여신사업자고객당사거래집계조회
			rLonBsmCsOcoDlnTtInq = commonDao.executeQueryOnlySingle();
		} catch (LNotFoundException e) {
			throw new LBizNotFoundException(CommConst.MG_NOT_FOUND.getCode(), e);
		} catch (LTooManyRowException e) {
			throw new LBizTooManyRowException(
					CommConst.MG_TOO_MANY_ROW.getCode(), e);
		}
		LProtocolInitializeUtil.primitiveLMultiInitialize(rLonBsmCsOcoDlnTtInq);
		return rLonBsmCsOcoDlnTtInq;
	}

	/**
	 * 
	 *
	 * @designSeq     
	 * @serviceID     
	 * @logicalName   여신주택소유대상자목록조회
	 * @param LData iLonHsePossTrpnListInq i여신주택소유대상자목록조회
	 * @return LMultiData rLonHsePossTrpnListInq r여신주택소유대상자목록조회
	 * @exception     LException occurs error 
	 * @modelProject  KV3_MDL_LON_ZZ(여신공통)
	 * @fullPath      2.시스템명세모델::05.엔터티컴포넌트::소매여신::여신계약::여신계약기본::여신계약기본Ebi::CORA_여신계약기본Ebi::ACSD_여신주택소유대상자목록조회
	 * 
	 */
	public LMultiData retvLstLonHsePossTrpn(LData iLonHsePossTrpnListInq)
			throws LException {
		//#Return 변수 선언 및 초기화
		LMultiData rLonHsePossTrpnListInq = new LMultiData(); //# r여신주택소유대상자목록조회
		//#호출 오퍼레이션에서 사용된 파라미터 초기화
		LPagingCommonDao pagingDao;
		// Paging Parameter 처리
		LPagingUtil.setIndexPageInfo(iLonHsePossTrpnListInq,
				iLonHsePossTrpnListInq.getInt("page_no"),
				iLonHsePossTrpnListInq.getInt("page_size"));
		pagingDao = new LPagingCommonDao(
				"lon/zz/rtalon/loncnr/loncnrbas/loncnrbasebi/TB_CTL1001/retvLstLonHsePossTrpn",
				iLonHsePossTrpnListInq); //##여신주택소유대상자목록조회
		rLonHsePossTrpnListInq = pagingDao.executeQueryForIndexPage();
		LProtocolInitializeUtil
				.primitiveLMultiInitialize(rLonHsePossTrpnListInq);
		return rLonHsePossTrpnListInq;
	}

	/**
	 * 여신주택소유대상자재확인목록조회
	 *
	 * @designSeq     
	 * @serviceID     
	 * @logicalName   여신주택소유대상자재확인목록조회
	 * @param LData iLonHsePossTgtMtriCfListInq i여신주택소유대상자재확인목록조회
	 * @return LMultiData rLonHsePossTgtMtriCfListInq r여신주택소유대상자재확인목록조회
	 * @exception     LException occurs error 
	 * @modelProject  KV3_MDL_LON_ZZ(여신공통)
	 * @fullPath      2.시스템명세모델::05.엔터티컴포넌트::소매여신::여신계약::여신계약기본::여신계약기본Ebi::CORA_여신계약기본Ebi::ACSD_여신주택소유대상자재확인목록조회
	 * 
	 */
	public LMultiData retvLstLonHsePossTgtMtriCf(
			LData iLonHsePossTgtMtriCfListInq) throws LException {
		//#Return 변수 선언 및 초기화
		LMultiData rLonHsePossTgtMtriCfListInq = new LMultiData(); //# r여신주택소유대상자재확인목록조회
		//#호출 오퍼레이션에서 사용된 파라미터 초기화
		LCommonDao commonDao;
		commonDao = new LCommonDao(
				"lon/zz/rtalon/loncnr/loncnrbas/loncnrbasebi/TB_CTL1001/retvLstLonHsePossTgtMtriCf",
				iLonHsePossTgtMtriCfListInq); //##여신주택소유대상자재확인목록조회
		rLonHsePossTgtMtriCfListInq = commonDao.executeQuery();
		LProtocolInitializeUtil
				.primitiveLMultiInitialize(rLonHsePossTgtMtriCfListInq);
		return rLonHsePossTgtMtriCfListInq;
	}

	/**
	 * 
	 *
	 * @designSeq     
	 * @serviceID     
	 * @logicalName   채권서류입고보유조직코드수정
	 * @param LData iBdPprWrhsHldOrzCdUpd i채권서류입고보유조직코드수정
	 * @exception     LException occurs error 
	 * @modelProject  KV3_MDL_LON_ZZ(여신공통)
	 * @fullPath      2.시스템명세모델::05.엔터티컴포넌트::소매여신::여신계약::여신계약기본::여신계약기본Ebi::CORA_여신계약기본Ebi::ACSD_채권서류입고보유조직코드수정
	 * 
	 */
	public void uptBdPprWrhsHldOrzCd(LData iBdPprWrhsHldOrzCdUpd)
			throws LException {
		//#Return 변수 선언 및 초기화
		//#호출 오퍼레이션에서 사용된 파라미터 초기화
		LCommonDao commonDao;
		commonDao = new LCommonDao(
				"lon/zz/rtalon/loncnr/loncnrbas/loncnrbasebi/TB_CTL1001/uptBdPprWrhsHldOrzCd",
				iBdPprWrhsHldOrzCdUpd); //##채권서류입고보유조직코드수정
		int affectedCount = commonDao.executeUpdate();
		if (affectedCount == 0) {
			throw new LBizNotAffectedException(
					CommConst.MG_NOT_AFFECTED.getCode());
		}
	}
}