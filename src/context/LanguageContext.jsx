import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const TRANSLATIONS = {
  en: {
    // Top Bar & Global
    'gov.banner': 'Government of India • National Standards Intelligence',
    'gov.portal': 'Portal',
    'gov.standardized': 'Govt. of India Standardized',
    'search.placeholder': 'Search IS number or item...',
    'officer.title': 'Procurement Officer',
    'officer.dept': 'Directorate of Supplies & Disposal',
    'status.online': 'AI ONLINE',
    'status.version': 'v2025.2',
    'status.sync': 'BIS Gazette Sync',
    'status.synced': 'Synced 12m ago',
    'status.portal_active': 'Portal Active',
    'status.bis_compliant': 'BIS Act 2016 Compliant',

    // Sidebar Nav
    'nav.overview': 'Overview',
    'nav.intelligence': 'Intelligence',
    'nav.compliance': 'Compliance',
    'nav.details_access': 'Details & Access',
    'nav.dashboard': 'Dashboard',
    'nav.standards_search': 'Standards Search',
    'nav.recommendations': 'Recommendations',
    'nav.tender_review': 'Tender Review',
    'nav.qco_orders': 'QCO Orders',
    'nav.standards_library': 'Standards Library',
    'nav.standard_detail': 'Standard Detail View',
    'nav.audit_history': 'Audit History',
    'nav.officer_profile': 'Officer Profile',
    'nav.sign_out': 'Sign Out / Gateway',

    // Dashboard
    'dash.title': 'Procurement Standards & QCO Dashboard',
    'dash.subtitle': 'BIS specification mapping, active QCO enforcement status, and tender compliance checks.',
    'dash.catalog_badge': 'BIS Catalog v2025.2',
    'dash.catalog_updated': 'Updated Today 08:30 IST',
    'dash.export_audit': 'Export Audit',
    'dash.new_tender_review': 'New Tender Review',
    'dash.stat1_title': 'ACTIVE STANDARDS CATALOG',
    'dash.stat1_desc': 'Specifications indexed across 14 BIS technical divisions, covering all active Gazette notifications through Q1 2025.',
    'dash.stat1_div': 'Divisions CED, ETD, MTD, TXD',
    'dash.stat2_title': 'SPECIFICATIONS MATCHED',
    'dash.stat2_desc': 'Automated specification crosswalks generated for municipal and central procurement requisitions.',
    'dash.stat2_latency': 'Avg latency: 1.4s',
    'dash.stat3_title': 'TENDERS AUDITED',
    'dash.stat3_desc': 'Public RFPs vetted with clause mapping against mandatory Quality Control Orders.',
    'dash.stat3_disc': 'Zero critical discrepancies',
    'dash.stat_codes': 'codes',
    'dash.stat_queries': 'queries',
    'dash.stat_boqs': 'BOQs',
    'dash.stat_match_pct': '98.6% match',

    'dash.workflows_title': 'DIRECT AUDITOR WORKFLOWS',
    'dash.workflows_shortcut': 'Press ⌘1 to ⌘4 for rapid launch',
    'dash.wf1_title': 'Find a Standard',
    'dash.wf1_desc': 'Search Indian Standards using AI natural language requirement matching & code crosswalks.',
    'dash.wf1_action': 'Query Corpus',
    'dash.wf2_title': 'Analyze Tender',
    'dash.wf2_desc': 'Upload procurement RFP or BOQ to identify missing mandatory specifications.',
    'dash.wf2_action': 'Ingest Document',
    'dash.wf3_title': 'Check Compliance',
    'dash.wf3_desc': 'Verify mandatory BIS certification rules & active gazette Quality Control Orders (QCOs).',
    'dash.wf3_action': 'Verify Order',
    'dash.wf4_title': 'Browse Library',
    'dash.wf4_desc': 'Explore 12,000+ indexed standards with revision logs, withdrawn notices & draft revisions.',
    'dash.wf4_action': 'Access Repository',

    'dash.dist_title': 'Standards by Product Category',
    'dash.dist_tag': 'NATIONAL DISTRIBUTION',
    'dash.dist_calibrated': 'Calibrated to Gazette 2025',
    'dash.dist_crs_note': 'Compulsory Registration Scheme (CRS) tracks 88 of these categories',
    'dash.dist_view_taxonomy': 'View Taxonomy',
    'dash.dist_total_codes': 'Total Codes',
    'dash.dist_cat1': 'Electrical Equipment & Cables',
    'dash.dist_cat2': 'Civil Engineering & Construction',
    'dash.dist_cat3': 'Mechanical & Metallurgy',
    'dash.dist_cat4': 'Personal Protective Equipment (PPE)',
    'dash.dist_cat5': 'IT, Electronics & Telecom',
    'dash.dist_cat6': 'Chemicals & Technical Textiles',

    'dash.audit_trail_title': 'Recent AI Activity',
    'dash.audit_trail_tag': 'CONTINUOUS AUDIT TRAIL',
    'dash.audit_view_all': 'View Full Audit Log',
    'dash.audit_showing': 'Showing latest 4 events',

    'banner.title': 'BIS Gazette QCO Notification 2025/Q1 In Force',
    'banner.badge': 'Immediate Effect',
    'banner.desc': '17 new mechanical fasteners, polymer conduits, and medical diagnostic items are now legally governed under mandatory Indian Standards conformity for public procurement.',
    'banner.cta': 'Review Impacted Items',

    // Search Page
    'search.header_badge': 'BIS Requirement Search',
    'search.indexed_count': '12,486 Indexed Specifications',
    'search.title': 'Indian Standards Requirement Search',
    'search.subtitle': 'Input product specifications or tender parameters to identify matching Indian Standards and mandatory QCO orders.',
    'search.input_label': 'Procurement Specification / Requirement Details',
    'search.input_placeholder': 'Enter item description or parameters (e.g. 90W outdoor LED street light, protective helmets, cement)...',
    'search.btn': 'Search Standards',
    'search.analyzing': 'Analysing requirement...',
    'search.start_analysis': 'Start Analysis',
    'search.sample_queries': 'Sample queries:',
    'search.featured_tag': 'ACTIVE CATALOG',
    'search.featured_title': 'Frequently Audited Standards',
    'search.featured_desc': 'Common specifications queried across civil, electrical, and infrastructure tenders.',

    // Recommendations Page
    'rec.back_search': 'New Search',
    'rec.conformity_report': 'BIS Standard Conformity Report',
    'rec.title': 'Specification Match Report',
    'rec.subtitle': 'Candidate Indian Standards matched to procurement parameters and verified against active QCO mandates.',
    'rec.print_btn': 'Print Report',
    'rec.eval_req': 'EVALUATED REQUIREMENT',
    'rec.prod_cat': 'PRODUCT CATEGORY',
    'rec.extracted_params': 'EXTRACTED PARAMETERS',
    'rec.rule_title': 'Statutory Procurement Rule',
    'rec.rule_desc': 'Under Section 16 of the BIS Act, items listed with mandatory QCOs cannot be manufactured, imported, or procured on GeM without a valid BIS standard mark.',
    'rec.ranked_specs': 'RANKED SPECIFICATIONS',
    'rec.candidate_stds': 'Candidate Indian Standards',
    'rec.ordered_by': 'Ordered by technical parameter correspondence.',
    'rec.confidence': 'CONFIDENCE',
    'rec.high_match': 'High match',
    'rec.scope_mandate': 'SCOPE & COMPLIANCE MANDATE:',
    'rec.view_scope': 'View scope & allied standards',
    'rec.hide_scope': 'Hide scope details',
    'rec.specification_btn': 'Specification',
    'rec.no_match_title': 'No Standard Match Found',
    'rec.no_match_desc': 'No standard matched your query. Try different parameters or browse the library.',

    // Tender Analysis Page
    'tender.tag': 'Tender Document Auditor',
    'tender.conformance': 'Public Procurement Conformance',
    'tender.title': 'Tender Specification Audit',
    'tender.subtitle': 'Audit public procurement tenders against Indian Standards and mandatory Quality Control Orders.',
    'tender.upload_title': 'Upload Tender Specification Document',
    'tender.upload_desc': 'Ingest RFP, BOQ, or scope of work document to cross-reference Indian Standards.',
    'tender.load_sample': 'Load Sample BOQ',
    'tender.drag_drop': 'Drag and drop your tender PDF or DOCX file',
    'tender.browse_files': 'Browse Local Files',
    'tender.limit': 'Up to 25MB • Section-by-section parameter extraction',
    'tender.evaluating': 'Evaluating Document Clauses...',
    'tender.eval_step1': 'Parsing document text & extracting BOQ clauses...',
    'tender.eval_step2': 'Matching extracted parameters to Indian Standards database...',
    'tender.eval_step3': 'Verifying mandatory QCO orders & gazette amendments...',
    'tender.eval_step4': 'Compiling compliance score & specification discrepancy report...',

    // Compliance Page
    'comp.tag': 'QCO Verification',
    'comp.orders_active': 'Gazette Orders Active',
    'comp.title': 'Quality Control Order (QCO) Verification',
    'comp.subtitle': 'Verify whether products require compulsory BIS certification marks under central Ministry Quality Control Orders.',
    'comp.print_note': 'Print Compliance Note',
    'comp.select_label': 'Select Indian Standard for Regulatory Mandate Check:',
    'comp.filter_placeholder': 'Filter by IS number or product name...',
    'comp.banner_title': 'Central Quality Control Order Enforcement (Q1 2025)',
    'comp.statutory_badge': 'Statutory Rule',
    'comp.banner_desc': 'Failure to procure BIS-certified products where a mandatory QCO is enacted violates Section 16 of the BIS Act 2016 and General Financial Rules (GFR).',
    'comp.browse_gazette': 'Browse QCO Gazette Library',

    // Standards Library Page
    'lib.tag': 'Bureau of Indian Standards Repository',
    'lib.title': 'Indian Standards Library',
    'lib.subtitle': 'Browse and query official BIS specifications, quality control orders, and gazette amendments.',
    'lib.req_search_btn': 'Requirement Search',
    'lib.filter_placeholder': 'Filter by IS code, title or product keyword (e.g. IS 10322, helmet, cement, cable)...',
    'lib.divisions': 'Divisions:',
    'lib.div_all': 'All',
    'lib.div_lighting': 'Lighting',
    'lib.div_safety': 'Safety/PPE',
    'lib.div_cement': 'Cement/Construction',
    'lib.div_cables': 'Electrical Cables',
    'lib.th_code': 'STANDARD CODE',
    'lib.th_title': 'SPECIFICATION TITLE & SCOPE',
    'lib.th_category': 'CATEGORY',
    'lib.th_status': 'STATUS',
    'lib.th_action': 'ACTION',
    'lib.inspect': 'Inspect',

    // Standard Detail View Page
    'detail.back': 'Back to Library',
    'detail.record_id': 'Record ID:',
    'detail.official_portal': 'BIS Official Portal',
    'detail.verify_qco': 'Verify QCO Order',
    'detail.tech_division': 'Technical Division',
    'detail.prod_category': 'Product Category',
    'detail.conformity_scheme': 'Conformity Scheme',
    'detail.gazette_year': 'Gazette Year',
    'detail.scope_title': 'Technical Scope & Regulatory Application',
    'detail.clauses_title': 'Mandatory Specification Clauses & Test Methods',
    'detail.clauses_sub': 'Auditable technical specifications required during tender evaluation.',
    'detail.allied_title': 'Allied & Cross-Referenced Indian Standards',
    'detail.th_clause': 'Clause / ID',
    'detail.th_param': 'Parameter Name',
    'detail.th_req': 'Specified Requirement',
    'detail.th_method': 'Verification Method',

    // Audit History Page
    'hist.tag': 'Session Log',
    'hist.records': 'Records',
    'hist.title': 'Specification Review History',
    'hist.subtitle': 'Previous procurement requirement searches and tender document audits.',
    'hist.clear_log': 'Clear Log',
    'hist.new_search': 'New Search',
    'hist.search_placeholder': 'Search previous reviews by keyword...',
    'hist.showing': 'Showing',
    'hist.of': 'of',
    'hist.reviews': 'reviews',
    'hist.th_type': 'Audit Type',
    'hist.th_req': 'Requirement / Document Name',
    'hist.th_mapped': 'Standards Mapped',
    'hist.th_score': 'Match Score',
    'hist.th_date': 'Date',
    'hist.th_action': 'Action',
    'hist.reopen': 'Re-open',
    'hist.empty_title': 'No review history',
    'hist.empty_desc': 'You have cleared your audit log. Run a new search to populate history.',
    'hist.restore_demo': 'Restore Demo Log',
    'hist.start_new': 'Start New Review',

    // Login Page
    'login.welcome': 'Sign In to Portal',
    'login.sub': 'Indian Standards & QCO Procurement Portal',
    'login.username_label': 'Username / Official Name',
    'login.username_placeholder': 'e.g. Sujai Raj or officer@gov.in',
    'login.password_label': 'Password / Passcode',
    'login.password_placeholder': 'Enter your passcode',
    'login.demo_hint': 'Demo: Sujai Raj / isense2026',
    'login.auto_fill': 'Auto Fill',
    'login.submit_btn': 'Sign In to Portal',
    'login.signing_in': 'Signing In...',
    'login.sso_note': 'Single Sign-On enabled for NIC, GeM & Central Procurement Officers',
    'login.copyright': 'Bureau of Indian Standards Intelligence',

    // Profile Page
    'profile.title': 'Officer Profile & Audit Credentials',
    'profile.subtitle': 'Procurement authority credentials used on gazette audit signatures and tender review reports.',
    'profile.cred_verified': 'Officer Credential Verified',
    'profile.sso_active': 'NIC Single Sign-On Active',
    'profile.save_btn': 'Save Credentials',
    'profile.full_name': 'Full Name',
    'profile.designation': 'Designation',
    'profile.department': 'Department',
    'profile.organization': 'Organization',
    'profile.official_email': 'Official Email',
    'profile.contact_phone': 'Official Contact Phone',

    // Badges & Common
    'badge.current': 'CURRENT',
    'badge.mandatory_qco': 'Mandatory QCO',
    'badge.mandatory_crs': 'Compulsory CRS',
    'badge.scheme1': 'Scheme-I Mandatory (ISI)',
    'badge.verified': 'Verified',
    'theme.toggle_dark': 'Switch to Dark Mode',
    'theme.toggle_light': 'Switch to Light Mode',
    'lang.toggle_hi': 'हिन्दी',
    'lang.toggle_en': 'English'
  },

  hi: {
    // Top Bar & Global
    'gov.banner': 'भारत सरकार • राष्ट्रीय मानक आसूचना प्रणाली',
    'gov.portal': 'पोर्टल',
    'gov.standardized': 'भारत सरकार द्वारा मानकीकृत',
    'search.placeholder': 'भारतीय मानक (IS) संख्या या सामग्री खोजें...',
    'officer.title': 'खरीद अधिकारी',
    'officer.dept': 'आपूर्ति एवं निपटान निदेशालय',
    'status.online': 'एआई ऑनलाइन',
    'status.version': 'संस्करण 2025.2',
    'status.sync': 'बीआईएस राजपत्र समन्वय',
    'status.synced': '12 मिनट पहले समन्वित',
    'status.portal_active': 'पोर्टल सक्रिय',
    'status.bis_compliant': 'बीआईएस अधिनियम 2016 अनुरूप',

    // Sidebar Nav
    'nav.overview': 'अवलोकन',
    'nav.intelligence': 'आसूचना प्रणाली',
    'nav.compliance': 'अनिवार्य अनुपालन',
    'nav.details_access': 'विवरण एवं पहुँच',
    'nav.dashboard': 'डैशबोर्ड',
    'nav.standards_search': 'मानक खोज',
    'nav.recommendations': 'एआई सिफारिशें',
    'nav.tender_review': 'निविदा समीक्षा',
    'nav.qco_orders': 'QCO आदेश',
    'nav.standards_library': 'मानक पुस्तकालय',
    'nav.standard_detail': 'मानक विवरण दृश्य',
    'nav.audit_history': 'ऑडिट इतिहास',
    'nav.officer_profile': 'अधिकारी प्रोफ़ाइल',
    'nav.sign_out': 'साइन आउट / गेटवे',

    // Dashboard
    'dash.title': 'खरीद मानक एवं QCO अनुपालन डैशबोर्ड',
    'dash.subtitle': 'बीआईएस तकनीकी विशिष्टता मानचित्रण, सक्रिय QCO प्रवर्तन स्थिति, तथा निविदा अनुपालन परीक्षण।',
    'dash.catalog_badge': 'बीआईएस सूची v2025.2',
    'dash.catalog_updated': 'अद्यतन: आज 08:30 IST',
    'dash.export_audit': 'ऑडिट निर्यात करें',
    'dash.new_tender_review': 'नई निविदा समीक्षा',
    'dash.stat1_title': 'सक्रिय मानक सूची',
    'dash.stat1_desc': '14 बीआईएस तकनीकी प्रभागों में अनुक्रमित विशिष्टताएँ, 2025 तक की सभी सक्रिय राजपत्र अधिसूचनाएँ शामिल।',
    'dash.stat1_div': 'प्रभाग CED, ETD, MTD, TXD',
    'dash.stat2_title': 'संश्लेषित विशिष्टताएँ',
    'dash.stat2_desc': 'GeM खरीद और बहु-राज्य नागरिक अवसंरचना निविदाओं के लिए स्वचालित तकनीकी विनिर्देश।',
    'dash.stat2_latency': 'औसत समय: 1.4 सेकंड',
    'dash.stat3_title': 'समीक्षित निविदाएँ',
    'dash.stat3_desc': 'सक्रिय गुणवत्ता नियंत्रण आदेश (QCO) के विरुद्ध पूर्ण उद्धरण मानचित्रण के साथ समीक्षित खरीद RFP/BOQ।',
    'dash.stat3_disc': 'शून्य गंभीर त्रुटियाँ',
    'dash.stat_codes': 'कोड',
    'dash.stat_queries': 'प्रश्न',
    'dash.stat_boqs': 'निविदाएँ',
    'dash.stat_match_pct': '98.6% सुमेलित',

    'dash.workflows_title': 'प्रत्यक्ष लेखापरीक्षक कार्यप्रवाह',
    'dash.workflows_shortcut': 'त्वरित शुरुआत के लिए ⌘1 से ⌘4 दबाएँ',
    'dash.wf1_title': 'मानक खोजें',
    'dash.wf1_desc': 'एआई प्राकृतिक भाषा आवश्यकता मिलान और कोड क्रॉसवाक का उपयोग करके भारतीय मानक खोजें।',
    'dash.wf1_action': 'डेटाबेस खोजें',
    'dash.wf2_title': 'निविदा विश्लेषण',
    'dash.wf2_desc': 'अनिवार्य मानक विनिर्देशों और अप्रचलित उद्धरणों की पहचान के लिए खरीद RFP/BOQ अपलोड करें।',
    'dash.wf2_action': 'दस्तावेज़ जमा करें',
    'dash.wf3_title': 'अनुपालन जाँचें',
    'dash.wf3_desc': 'अनिवार्य बीआईएस प्रमाणन नियम और सक्रिय राजपत्र गुणवत्ता नियंत्रण आदेश (QCOs) सत्यापित करें।',
    'dash.wf3_action': 'आदेश सत्यापित करें',
    'dash.wf4_title': 'पुस्तकालय ब्राउज़ करें',
    'dash.wf4_desc': 'संशोधन लॉग, वापस लिए गए नोटिस और मसौदा संशोधनों के साथ 12,000+ अनुक्रमित मानकों का अन्वेषण करें।',
    'dash.wf4_action': 'पुस्तकालय खोलें',

    'dash.dist_title': 'उत्पाद श्रेणी अनुसार राष्ट्रीय मानक वितरण',
    'dash.dist_tag': 'राष्ट्रीय वितरण',
    'dash.dist_calibrated': 'राजपत्र 2025 के अनुसार कैलिब्रेटेड',
    'dash.dist_crs_note': 'अनिवार्य पंजीकरण योजना (CRS) इनमें से 88 श्रेणियों को ट्रैक करती है',
    'dash.dist_view_taxonomy': 'वर्गीकरण देखें',
    'dash.dist_total_codes': 'कुल मानक कोड',
    'dash.dist_cat1': 'विद्युत उपकरण एवं केबल',
    'dash.dist_cat2': 'सिविल इंजीनियरिंग एवं निर्माण',
    'dash.dist_cat3': 'यांत्रिक एवं धातुकर्म',
    'dash.dist_cat4': 'व्यक्तिगत सुरक्षा उपकरण (PPE)',
    'dash.dist_cat5': 'आईटी, इलेक्ट्रॉनिक्स एवं दूरसंचार',
    'dash.dist_cat6': 'रसायन एवं तकनीकी वस्त्र',

    'dash.audit_trail_title': 'हालिया एआई ऑडिट गतिविधि',
    'dash.audit_trail_tag': 'निरंतर ऑडिट ट्रेल',
    'dash.audit_view_all': 'पूर्ण ऑडिट लॉग देखें',
    'dash.audit_showing': 'नवीनतम 4 घटनाएँ प्रदर्शित',

    'banner.title': 'बीआईएस राजपत्र QCO अधिसूचना 2025/Q1 प्रभावी',
    'banner.badge': 'तत्काल प्रभाव',
    'banner.desc': '17 नए यांत्रिक फास्टनरों, बहुलक नलिकाओं और चिकित्सा नैदानिक मदों को अब सार्वजनिक खरीद के लिए अनिवार्य भारतीय मानकों के अनुरूप लाया गया है।',
    'banner.cta': 'प्रभावित वस्तुएं देखें',

    // Search Page
    'search.header_badge': 'बीआईएस आवश्यकता खोज',
    'search.indexed_count': '12,486 अनुक्रमित विशिष्टताएँ',
    'search.title': 'भारतीय मानक आवश्यकता खोज',
    'search.subtitle': 'सुसंगत भारतीय मानकों और अनिवार्य QCO आदेशों की पहचान के लिए उत्पाद विनिर्देश या निविदा पैरामीटर दर्ज करें।',
    'search.input_label': 'खरीद विनिर्देश / आवश्यकता विवरण',
    'search.input_placeholder': 'मद का विवरण या तकनीकी पैरामीटर दर्ज करें (उदा. 90W आउटडोर एलईडी स्ट्रीट लाइट, सुरक्षा हेलमेट, सीमेंट)...',
    'search.btn': 'मानक खोजें',
    'search.analyzing': 'आवश्यकता का विश्लेषण जारी है...',
    'search.start_analysis': 'विश्लेषण प्रारंभ करें',
    'search.sample_queries': 'उदाहरण प्रश्न:',
    'search.featured_tag': 'सक्रिय कैटलॉग',
    'search.featured_title': 'अक्सर जाँचे जाने वाले भारतीय मानक',
    'search.featured_desc': 'सिविल, विद्युत और बुनियादी ढांचा निविदाओं में व्यापक रूप से खोजी जाने वाली तकनीकी विशिष्टताएँ।',

    // Recommendations Page
    'rec.back_search': 'नई खोज',
    'rec.conformity_report': 'बीआईएस मानक अनुरूपता रिपोर्ट',
    'rec.title': 'विशिष्टता मिलान रिपोर्ट',
    'rec.subtitle': 'खरीद पैरामीटरों से सुमेलित और सक्रिय QCO आदेशों के तहत सत्यापित उम्मीदवार भारतीय मानक।',
    'rec.print_btn': 'रिपोर्ट प्रिंट करें',
    'rec.eval_req': 'मूल्यांकित आवश्यकता',
    'rec.prod_cat': 'उत्पाद श्रेणी',
    'rec.extracted_params': 'निकाले गए तकनीकी पैरामीटर',
    'rec.rule_title': 'वैधानिक खरीद नियम',
    'rec.rule_desc': 'बीआईएस अधिनियम की धारा 16 के तहत, अनिवार्य QCO वाली वस्तुओं का वैध बीआईएस मानक चिह्न के बिना GeM पर निर्माण, आयात या खरीद नहीं किया जा सकता।',
    'rec.ranked_specs': 'वरीयता प्राप्त विशिष्टताएँ',
    'rec.candidate_stds': 'उम्मीदवार भारतीय मानक',
    'rec.ordered_by': 'तकनीकी पैरामीटर पत्राचार के अनुसार क्रमबद्ध।',
    'rec.confidence': 'सटीकता विश्वास',
    'rec.high_match': 'उच्च मिलान',
    'rec.scope_mandate': 'दायरा एवं अनुपालन आदेश:',
    'rec.view_scope': 'दायरा और संबद्ध मानक देखें',
    'rec.hide_scope': 'दायरा विवरण छुपाएँ',
    'rec.specification_btn': 'पूर्ण विशिष्टता',
    'rec.no_match_title': 'कोई मानक मिलान नहीं मिला',
    'rec.no_match_desc': 'आपकी खोज के लिए कोई मानक मेल नहीं खाया। कृपया अन्य पैरामीटर आज़माएँ या पुस्तकालय देखें।',

    // Tender Analysis Page
    'tender.tag': 'निविदा दस्तावेज़ लेखापरीक्षक',
    'tender.conformance': 'सार्वजनिक खरीद अनुरूपता',
    'tender.title': 'निविदा विनिर्देश लेखापरीक्षा',
    'tender.subtitle': 'भारतीय मानकों और अनिवार्य गुणवत्ता नियंत्रण आदेशों (QCO) के विरुद्ध सार्वजनिक खरीद निविदाओं का ऑडिट।',
    'tender.upload_title': 'निविदा विनिर्देश दस्तावेज़ अपलोड करें',
    'tender.upload_desc': 'भारतीय मानकों के साथ क्रॉस-रेफरेंस के लिए RFP, BOQ, या कार्य-क्षेत्र दस्तावेज़ दर्ज करें।',
    'tender.load_sample': 'नमूना BOQ लोड करें',
    'tender.drag_drop': 'अपनी निविदा PDF या DOCX फ़ाइल यहाँ खींचें और छोड़ें',
    'tender.browse_files': 'फ़ाइल चुनें',
    'tender.limit': 'अधिकतम 25MB • खंड-दर-खंड पैरामीटर निष्कर्षण',
    'tender.evaluating': 'दस्तावेज़ खंडों का मूल्यांकन जारी है...',
    'tender.eval_step1': 'दस्तावेज़ पाठ पार्सिंग और BOQ खंड निष्कर्षण...',
    'tender.eval_step2': 'निकाले गए मापदंडों का भारतीय मानक डेटाबेस से मिलान...',
    'tender.eval_step3': 'अनिवार्य QCO आदेशों और राजपत्र संशोधनों का सत्यापन...',
    'tender.eval_step4': 'अनुपालन स्कोर और विनिर्देश विसंगति रिपोर्ट संकलन...',

    // Compliance Page
    'comp.tag': 'QCO सत्यापन',
    'comp.orders_active': 'सक्रिय राजपत्र आदेश',
    'comp.title': 'गुणवत्ता नियंत्रण आदेश (QCO) सत्यापन',
    'comp.subtitle': 'सत्यापित करें कि क्या उत्पादों को केंद्रीय मंत्रालय के गुणवत्ता नियंत्रण आदेशों के तहत अनिवार्य बीआईएस प्रमाणन की आवश्यकता है।',
    'comp.print_note': 'अनुपालन नोट प्रिंट करें',
    'comp.select_label': 'नियामक आदेश जाँच के लिए भारतीय मानक चुनें:',
    'comp.filter_placeholder': 'IS संख्या या उत्पाद नाम से खोजें...',
    'comp.banner_title': 'केंद्रीय गुणवत्ता नियंत्रण आदेश प्रवर्तन (2025/Q1)',
    'comp.statutory_badge': 'वैधानिक नियम',
    'comp.banner_desc': 'जहाँ अनिवार्य QCO लागू है, वहाँ गैर-बीआईएस प्रमाणित उत्पादों की खरीद करना बीआईएस अधिनियम 2016 की धारा 16 और सामान्य वित्तीय नियमों (GFR) का उल्लंघन है।',
    'comp.browse_gazette': 'QCO राजपत्र पुस्तकालय देखें',

    // Standards Library Page
    'lib.tag': 'भारतीय मानक ब्यूरो रिपॉजिटरी',
    'lib.title': 'भारतीय मानक पुस्तकालय',
    'lib.subtitle': 'आधिकारिक बीआईएस विशिष्टताओं, गुणवत्ता नियंत्रण आदेशों और राजपत्र संशोधनों को ब्राउज़ और क्वेरी करें।',
    'lib.req_search_btn': 'आवश्यकता खोज',
    'lib.filter_placeholder': 'IS कोड, शीर्षक या उत्पाद कीवर्ड से खोजें (उदा. IS 10322, हेलमेट, सीमेंट, केबल)...',
    'lib.divisions': 'प्रभाग:',
    'lib.div_all': 'सभी',
    'lib.div_lighting': 'प्रकाश व्यवस्था',
    'lib.div_safety': 'सुरक्षा / PPE',
    'lib.div_cement': 'सीमेंट / निर्माण',
    'lib.div_cables': 'विद्युत केबल',
    'lib.th_code': 'मानक कोड',
    'lib.th_title': 'विशिष्टता शीर्षक एवं कार्यक्षेत्र',
    'lib.th_category': 'श्रेणी',
    'lib.th_status': 'स्थिति',
    'lib.th_action': 'कार्यवाही',
    'lib.inspect': 'निरीक्षण',

    // Standard Detail View Page
    'detail.back': 'पुस्तकालय पर वापस जाएँ',
    'detail.record_id': 'अभिलेख संख्या:',
    'detail.official_portal': 'बीआईएस आधिकारिक पोर्टल',
    'detail.verify_qco': 'QCO आदेश सत्यापित करें',
    'detail.tech_division': 'तकनीकी प्रभाग',
    'detail.prod_category': 'उत्पाद श्रेणी',
    'detail.conformity_scheme': 'अनुरूपता योजना',
    'detail.gazette_year': 'राजपत्र वर्ष',
    'detail.scope_title': 'तकनीकी कार्यक्षेत्र एवं नियामक अनुप्रयोग',
    'detail.clauses_title': 'अनिवार्य विशिष्टता खंड एवं परीक्षण विधियाँ',
    'detail.clauses_sub': 'निविदा मूल्यांकन के दौरान आवश्यक लेखापरीक्षा योग्य तकनीकी विनिर्देश।',
    'detail.allied_title': 'संबद्ध एवं क्रॉस-रेफरेंस भारतीय मानक',
    'detail.th_clause': 'खंड / पहचान',
    'detail.th_param': 'पैरामीटर नाम',
    'detail.th_req': 'निर्धारित आवश्यकता',
    'detail.th_method': 'सत्यापन विधि',

    // Audit History Page
    'hist.tag': 'सत्र लॉग',
    'hist.records': 'अभिलेख',
    'hist.title': 'विशिष्टता समीक्षा इतिहास',
    'hist.subtitle': 'पिछली खरीद आवश्यकता खोजें और निविदा दस्तावेज़ ऑडिट का संपूर्ण इतिहास।',
    'hist.clear_log': 'लॉग साफ़ करें',
    'hist.new_search': 'नई खोज',
    'hist.search_placeholder': 'कीवर्ड द्वारा पिछली समीक्षाएँ खोजें...',
    'hist.showing': 'प्रदर्शित:',
    'hist.of': 'में से',
    'hist.reviews': 'समीक्षाएँ',
    'hist.th_type': 'ऑडिट प्रकार',
    'hist.th_req': 'आवश्यकता / दस्तावेज़ नाम',
    'hist.th_mapped': 'मानचित्रित मानक',
    'hist.th_score': 'मिलान स्कोर',
    'hist.th_date': 'दिनांक',
    'hist.th_action': 'कार्यवाही',
    'hist.reopen': 'पुनः खोलें',
    'hist.empty_title': 'कोई समीक्षा इतिहास नहीं है',
    'hist.empty_desc': 'आपने अपना ऑडिट लॉग साफ़ कर दिया है। इतिहास भरने के लिए नई खोज चलाएँ।',
    'hist.restore_demo': 'डेमो लॉग पुनर्स्थापित करें',
    'hist.start_new': 'नई समीक्षा प्रारंभ करें',

    // Login Page
    'login.welcome': 'पोर्टल में साइन इन करें',
    'login.sub': 'भारतीय मानक एवं QCO खरीद आसूचना पोर्टल',
    'login.username_label': 'उपयोगकर्ता नाम / आधिकारिक नाम',
    'login.username_placeholder': 'उदा. सुजई राज या officer@gov.in',
    'login.password_label': 'पासवर्ड / पासकोड',
    'login.password_placeholder': 'अपना पासकोड दर्ज करें',
    'login.demo_hint': 'डेमो: सुजई राज / isense2026',
    'login.auto_fill': 'स्वतः भरें',
    'login.submit_btn': 'पोर्टल में प्रवेश करें',
    'login.signing_in': 'प्रवेश किया जा रहा है...',
    'login.sso_note': 'NIC, GeM एवं केंद्रीय खरीद अधिकारियों के लिए सिंगल साइन-ऑन सक्षम',
    'login.copyright': 'भारतीय मानक ब्यूरो आसूचना प्रणाली',

    // Profile Page
    'profile.title': 'अधिकारी प्रोफ़ाइल एवं ऑडिट साख',
    'profile.subtitle': 'राजपत्र ऑडिट हस्ताक्षर और निविदा समीक्षा रिपोर्टों पर उपयोग किए जाने वाले खरीद प्राधिकरण क्रेडेंशियल।',
    'profile.cred_verified': 'अधिकारी क्रेडेंशियल सत्यापित',
    'profile.sso_active': 'एनआईसी सिंगल साइन-ऑन सक्रिय',
    'profile.save_btn': 'क्रेडेंशियल सहेजें',
    'profile.full_name': 'पूरा नाम',
    'profile.designation': 'पदनाम',
    'profile.department': 'विभाग',
    'profile.organization': 'संगठन / संस्था',
    'profile.official_email': 'आधिकारिक ईमेल',
    'profile.contact_phone': 'आधिकारिक संपर्क फोन',

    // Badges & Common
    'badge.current': 'सक्रिय / वर्तमान',
    'badge.mandatory_qco': 'अनिवार्य QCO',
    'badge.mandatory_crs': 'अनिवार्य CRS',
    'badge.scheme1': 'योजना-I अनिवार्य (ISI)',
    'badge.verified': 'सत्यापित',
    'theme.toggle_dark': 'डार्क मोड चालू करें',
    'theme.toggle_light': 'लाइट मोड चालू करें',
    'lang.toggle_hi': 'हिन्दी',
    'lang.toggle_en': 'English'
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    try {
      return localStorage.getItem('isense_language') || 'en';
    } catch {
      return 'en';
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('isense_language', language);
      document.documentElement.lang = language;
    } catch (e) {
      console.warn('Failed to save language to localStorage', e);
    }
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => (prev === 'en' ? 'hi' : 'en'));
  };

  const t = (key, fallback = '') => {
    const dict = TRANSLATIONS[language] || TRANSLATIONS.en;
    if (dict[key] !== undefined) {
      return dict[key];
    }
    const fallbackDict = TRANSLATIONS.en;
    if (fallbackDict[key] !== undefined) {
      return fallbackDict[key];
    }
    return fallback || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
