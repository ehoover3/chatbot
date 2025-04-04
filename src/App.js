import React, { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const qaPairs = [
    // Existing Customer Service & Loan Processing Q&A
    {
      question: "What do I do if a customer is not satisfied with the terms of a loan?",
      answer: "Listen to the customer's concerns, then explain the reasoning behind the terms. If needed, refer them to a loan officer for possible adjustments or alternatives.",
    },
    {
      question: "The applicant's credit report shows a recent bankruptcy. How should I proceed?",
      answer: "Review the details of the bankruptcy and check for any required waiting periods. Consult your lending guidelines to see if they qualify for a loan.",
    },
    {
      question: "How do I verify a customer's identity when they don't have their ID?",
      answer: "Ask for alternative forms of identification, such as a utility bill or government correspondence.",
    },
    {
      question: "I've encountered an error message when processing a transaction. What should I do?",
      answer: "Take a screenshot of the error message, restart the transaction, and if the issue persists, contact IT support for troubleshooting.",
    },
    {
      question: "The customer wants to dispute a charge. How do I handle that?",
      answer: "Explain the dispute process and provide them with the necessary forms. If it involves a loan or account issue, refer them to the relevant department for further action.",
    },
    {
      question: "The loan application is incomplete. How should I inform the customer?",
      answer: "Contact the customer politely, explain the missing information, and provide them with a clear list of required documents or details.",
    },
    {
      question: "Can I approve a loan without all the required documentation?",
      answer: "No, you must ensure all documentation is received and validated before approval. Incomplete applications cannot proceed.",
    },
    {
      question: "What should I do if I suspect a fraudulent loan application?",
      answer: "Immediately report your concerns to the fraud detection team or supervisor for further investigation. Do not process the loan until cleared.",
    },
    {
      question: "A customer wants to pay off their loan early. What steps do I need to take?",
      answer: "Verify the loan agreement for any early payment penalties. Then, assist the customer with the payoff process, ensuring they receive the updated balance and any necessary documents.",
    },
    {
      question: "What happens if a loan application is denied?",
      answer: "Notify the applicant respectfully, explaining the reason for the denial. Offer to discuss alternative options, such as improving credit score or reapplying after a certain period.",
    },
    {
      question: "The loan payment system isn't processing payments correctly. How do I handle it?",
      answer: "Verify the issue by testing with another payment. If it persists, escalate the problem to the payment processing team for resolution.",
    },
    {
      question: "What do I do if the applicant's income seems too low to qualify for a loan?",
      answer: "Discuss other qualifying factors such as assets or co-signers. If their income is insufficient, suggest smaller loan amounts or different types of loans.",
    },
    {
      question: "I'm not sure if the loan application meets the bank's risk standards. How do I proceed?",
      answer: "Review the application against the bank's risk guidelines. If still uncertain, escalate to a senior loan officer or underwriting team for review.",
    },
    {
      question: "How do I process a loan modification request?",
      answer: "Review the original loan agreement and ensure the customer qualifies for modification. Process the necessary paperwork, updating the system with the new terms.",
    },
    {
      question: "The system won't allow me to submit the loan application. What should I check?",
      answer: "Ensure all required fields are filled out accurately, verify that there are no system maintenance alerts, and double-check for any system errors.",
    },
    {
      question: "What should I do if a customer is inquiring about loan rates?",
      answer: "Provide the current interest rates based on their loan type and credit profile. For specific rates, check the internal rate system and ensure it's up-to-date.",
    },
    {
      question: "The customer is requesting a second loan while already having an active one. What steps should I take?",
      answer: "Review the customer's current loan terms and financial situation. If they qualify for another loan, begin the application process, considering their debt-to-income ratio.",
    },
    {
      question: "I noticed discrepancies between the applicant's documents and the information in the system. What should I do?",
      answer: "Contact the applicant to clarify any inconsistencies, and if necessary, request updated or corrected documents. Log the discrepancies for further review.",
    },
    {
      question: "What should I do if the customer is asking for loan forgiveness?",
      answer: "Explain the eligibility criteria for loan forgiveness programs, if applicable. Refer them to the appropriate department for detailed assistance with forgiveness options.",
    },
    {
      question: "A customer wants to increase their credit limit. How do I assess the request?",
      answer: "Review the customer's credit history, current loan performance, and income. If they meet the bank's criteria, initiate the process to increase the limit.",
    },
    {
      question: "What steps do I take to close a loan account after the loan is paid off?",
      answer: "Confirm the final payment is made, update the system to reflect the closed account, and provide the customer with a closure letter or document.",
    },

    // Existing IT & Technical Support Q&A
    {
      question: "I can't log into the loan processing system. What should I do?",
      answer: "Check if your credentials are correct. If the issue persists, reset your password or contact the IT support team to ensure your account is active and there are no access restrictions.",
    },
    {
      question: "The scanner is not working. How should I troubleshoot this?",
      answer: "Check if the scanner is properly connected to your computer and powered on. If it still doesn't work, try restarting your system. If the problem continues, contact IT support for further troubleshooting.",
    },
    {
      question: "My computer is running very slow. What can I do to speed it up?",
      answer: "Close any unnecessary applications or browser tabs. Clear cache and temporary files. If the issue persists, contact IT support to check for potential system malfunctions or updates.",
    },
    {
      question: "The printer is not connecting to the system. What should I do?",
      answer: "First, check the printer's connection to the network or your computer. If it's a network printer, ensure you're connected to the correct network. If the issue persists, try restarting both the printer and your computer.",
    },
    {
      question: "I can't access the loan database. What should I check?",
      answer: "Ensure your device is connected to the secure VPN if working remotely. Verify your network connection and check with the IT department for any server issues or maintenance that might be affecting access.",
    },
    {
      question: "The loan application software is freezing. How can I resolve this?",
      answer: "Try restarting the application or logging out and back in. If the issue continues, check for any available updates for the software, or contact IT support if the problem persists.",
    },
    {
      question: "I received an error message saying 'Connection timed out.' What should I do?",
      answer: "Check your internet connection to ensure it's stable. If the issue persists, try reconnecting to the network or contact IT support to check for server issues or downtime.",
    },
    {
      question: "The customer's document upload isn't going through. How should I handle it?",
      answer: "Ask the customer to check their file format and size. If the upload fails again, advise them to try a different browser or contact IT support if the problem seems related to the system.",
    },
    {
      question: "My work email isn't syncing. What can I do?",
      answer: "Ensure that you're connected to the internet. If the problem persists, try restarting your email application or re-syncing it. If necessary, contact IT support to verify email server settings.",
    },
    {
      question: "The loan application page keeps loading forever. What should I do?",
      answer: "Check if the internet connection is stable. Try refreshing the page or clearing your browser's cache. If the issue continues, contact IT support for assistance with system performance.",
    },
    {
      question: "I'm getting a pop-up about system maintenance. Can I still process loans?",
      answer: "System maintenance might affect some functionalities. Check the time and duration of the maintenance window, and consult with IT to determine if you can continue processing or need to wait.",
    },
    {
      question: "I can't find a customer's application in the system. What should I do?",
      answer: "Double-check the search criteria, ensuring the correct customer ID or name is entered. If the application still doesn't appear, verify with IT support if the system had any recent updates or issues that may have affected data visibility.",
    },
    {
      question: "I'm experiencing issues with accessing customer records. What should I check?",
      answer: "Ensure your user permissions haven't changed. Check with IT support to verify that you have the correct access rights, or if there's a system-wide issue affecting access.",
    },
    {
      question: "The system keeps logging me out unexpectedly. How do I fix it?",
      answer: "Check if there's an issue with your session timeout settings. If it's happening frequently, contact IT support to ensure there aren't any system bugs or security configurations causing the logouts.",
    },
    {
      question: "I can't update a customer's loan details in the system. What should I do?",
      answer: "Verify that the loan details are not locked by another user or pending approval. If you still can't update the information, contact IT support to check for possible system errors or permission issues.",
    },
    {
      question: "The system won't let me approve a loan application. What do I do?",
      answer: "Double-check that all required fields and documents are completed. If everything seems in order but the issue persists, escalate to IT support to investigate any system or configuration errors.",
    },
    {
      question: "I am receiving 'Access Denied' errors when trying to approve loans. What could be the issue?",
      answer: "This could be due to permission restrictions on your user account. Check with IT support to ensure you have the appropriate access level for loan approvals.",
    },
    {
      question: "I need to access an old loan file, but the system says it's archived. How do I retrieve it?",
      answer: "Contact IT support or use the archive retrieval process within the system. You may need special permissions to access archived files.",
    },
    {
      question: "The application isn't saving the loan data. What should I check?",
      answer: "Ensure that your internet connection is stable and check if the system has a 'Save' button or autosave feature. If the issue persists, restart the application or contact IT support to check for software bugs.",
    },
    {
      question: "The system crashed while processing a loan. What should I do?",
      answer: "Try reopening the loan application in the system to see if the data was saved. If not, retrieve any autosaved information and report the crash to IT support for investigation.",
    },
    {
      question: "I can't see the customer's loan history in the system. What could be wrong?",
      answer: "Ensure the customer's records are properly entered and linked to the system. If there's a data mismatch or technical issue, contact IT support to resolve the visibility problem.",
    },
    {
      question: "The bank's mobile app isn't functioning correctly. What can I do?",
      answer: "Ask the customer to check their internet connection and ensure their app is up-to-date. If the issue persists, advise them to uninstall and reinstall the app or escalate the issue to IT support.",
    },

    // New Account Management Q&A
    {
      question: "How do I help a customer set up direct deposit?",
      answer: "Provide the customer with a direct deposit form containing the bank's routing number and their account number. If they need electronic setup, guide them through the online banking portal or mobile app where this information is available.",
    },
    {
      question: "What's the procedure for closing a customer's account?",
      answer: "Verify the customer's identity, ensure the account has a zero balance or process any remaining funds transfer, document the closure reason, and have the customer sign the account closure form. Then update the system to reflect the closed status.",
    },
    {
      question: "A customer wants to add a beneficiary to their account. What's the process?",
      answer: "Have the customer complete a beneficiary designation form with the beneficiary's full name, contact information, and relationship. Verify the customer's identity, scan the completed form, and update the account information in the system.",
    },
    {
      question: "How do I process a name change on an account?",
      answer: "Request legal documentation showing the name change (marriage certificate, court order, etc.). Verify the customer's identity, scan the documents, update the system with the new name, and order new cards/checks if needed.",
    },
    {
      question: "What's the maximum daily withdrawal limit for ATMs?",
      answer: "The standard daily ATM withdrawal limit is $500 for regular accounts and $1,000 for premium accounts. These limits can be temporarily increased upon customer request with proper authorization.",
    },
    {
      question: "How do I help a customer set up overdraft protection?",
      answer: "Explain the overdraft protection options (linked savings account, credit line, or opt-in fee-based coverage). Have them complete the appropriate form, review the terms and conditions, and update their account preferences in the system.",
    },
    {
      question: "What should I do if a customer reports a lost debit card?",
      answer: "Immediately deactivate the lost card in the system, verify the customer's identity, order a replacement card, and advise them on monitoring their account for unauthorized transactions. Provide estimated delivery time for the new card.",
    },
    {
      question: "How do I help a customer with multiple accounts link them in online banking?",
      answer: "Verify the customer's ownership of all accounts, ensure they're enrolled in online banking, and guide them through the account linking process either in-branch using your admin tools or by walking them through the steps in the online banking portal.",
    },
    {
      question: "What's the process for converting a single account to a joint account?",
      answer: "Have the new account holder present with ID, complete joint account application forms, obtain signatures from both parties, verify identities, and update the account type in the system. Issue new cards/checks if requested.",
    },
    {
      question: "A customer wants to dispute an ACH transaction. What do I do?",
      answer: "Complete an ACH dispute form with the customer, detailing the transaction information and reason for dispute. Submit the form to the ACH department, provide the customer with a case number, and inform them of the typical resolution timeframe.",
    },

    // New Compliance & Security Q&A
    {
      question: "How do I verify a suspicious-looking check?",
      answer: "Examine the check for security features like watermarks and microprinting. Verify the account holder's signature against records, check for any alterations, and if still suspicious, contact the issuing bank to verify funds and authenticity.",
    },
    {
      question: "What should I do if I suspect money laundering activity?",
      answer: "Document the suspicious activity without alerting the customer, complete a Suspicious Activity Report (SAR), and notify your compliance officer or manager immediately. Do not process any further transactions until cleared.",
    },
    {
      question: "How do I handle a customer who refuses to provide ID for a large cash withdrawal?",
      answer: "Politely explain that ID verification is required by bank policy and federal regulations for transactions over $10,000. If they still refuse, escalate to a manager and do not process the transaction.",
    },
    {
      question: "What's the procedure for handling a subpoena for customer records?",
      answer: "Do not provide any information directly. Forward the subpoena to the legal department immediately and document that you received it. Inform the requesting party that the legal department will respond accordingly.",
    },
    {
      question: "How do I identify potential check kiting?",
      answer: "Watch for patterns of depositing checks between multiple accounts with immediate withdrawals before funds clear, frequent deposits and withdrawals in short timeframes, or unusual account activity. Report suspicious patterns to the fraud department.",
    },
    {
      question: "What's the process for filing a Currency Transaction Report (CTR)?",
      answer: "For cash transactions over $10,000, complete a CTR form with the customer's identification information, transaction details, and account information. Submit the form within the required timeframe according to bank policy.",
    },
    {
      question: "I suspect a customer is being scammed. What should I do?",
      answer: "Speak with the customer privately about your concerns, ask questions about the nature of the transaction, provide information about common scams, and if necessary, involve a manager to help prevent potential fraud.",
    },
    {
      question: "How do I handle a customer who appears to be under duress during a transaction?",
      answer: "Use pre-established code phrases to check if they need help, stall the transaction if possible, and discreetly alert security or management. Follow your branch's emergency protocol if you believe the customer is in danger.",
    },
    {
      question: "What should I do if a customer presents a Power of Attorney document?",
      answer: "Verify that the Power of Attorney is properly executed, current, and covers banking transactions. Forward the document to the legal department for validation before processing any transactions, and maintain a copy in the customer's file.",
    },
    {
      question: "How do I verify the identity of someone claiming to be an executor of an estate?",
      answer: "Request court-issued documents proving their executor status (Letters Testamentary or Letters of Administration), verify their identity with government-issued ID, and consult with the legal department before providing access to the deceased's accounts.",
    },

    // New Loan Processing Q&A
    {
      question: "What documents are required for a mortgage pre-approval?",
      answer: "Collect recent pay stubs (last 30 days), W-2 forms or tax returns for the past two years, bank statements for the last three months, and proof of assets. Also verify the customer's identity and run a credit check with their authorization.",
    },
    {
      question: "How do I calculate a customer's debt-to-income ratio?",
      answer: "Add up all monthly debt payments (including the proposed loan payment) and divide by their gross monthly income. Multiply by 100 to get the percentage. For most loans, the ratio should not exceed 43%, but this varies by loan type.",
    },
    {
      question: "What's the difference between pre-qualification and pre-approval?",
      answer: "Pre-qualification is a preliminary assessment based on customer-provided information without verification. Pre-approval involves thorough verification of income, assets, and credit, resulting in a conditional commitment to lend a specific amount.",
    },
    {
      question: "How do I handle a loan application with a co-signer?",
      answer: "Collect the same documentation from both the primary applicant and co-signer. Both parties must complete the application forms, provide identification, and consent to credit checks. Evaluate both parties' creditworthiness when processing the application.",
    },
    {
      question: "What factors determine the interest rate offered to a loan applicant?",
      answer: "Key factors include credit score, loan-to-value ratio, loan term, loan amount, current market rates, relationship with the bank, and debt-to-income ratio. Document all factors that influenced the rate determination.",
    },
    {
      question: "How do I process a construction loan application?",
      answer: "In addition to standard loan documentation, collect the construction contract, builder information, architectural plans, construction timeline, and cost breakdown. Schedule property appraisal based on completed value and verify builder credentials.",
    },
    {
      question: "What's the process for handling a loan application for a self-employed individual?",
      answer: "Request business and personal tax returns for the past two years, year-to-date profit and loss statement, business bank statements, and business license or registration. Calculate income based on the average adjusted gross income from tax returns.",
    },
    {
      question: "How do I determine if a customer qualifies for an SBA loan?",
      answer: "Verify the business meets SBA size standards for their industry, operates for profit, is engaged in business in the US, has owner equity to invest, and has exhausted other financing options. Collect business plans, financial projections, and industry-specific documentation.",
    },
    {
      question: "What should I do if a loan applicant has insufficient credit history?",
      answer: "Request alternative credit documentation such as rent payment history, utility bills, insurance payments, and cell phone bills. Consider offering a secured loan option or suggesting a co-signer to strengthen the application.",
    },
    {
      question: "How do I process a loan application involving collateral?",
      answer: "Document the collateral details, arrange for professional appraisal or valuation, verify ownership, check for existing liens, and determine loan-to-value ratio. Explain collateral requirements and repossession terms to the applicant.",
    },

    // New Customer Service Q&A
    {
      question: "How do I help a customer who's been a victim of identity theft?",
      answer: "Guide them to place a fraud alert on their credit reports, help them change all passwords and PINs, document the incident, file a police report, complete an affidavit of fraud, and monitor accounts closely. Refer them to the fraud department for additional support.",
    },
    {
      question: "What should I do when a customer is upset about account fees?",
      answer: "Listen attentively to their concerns, explain the fee structure clearly, review their account activity to identify why the fees were applied, and check if they qualify for fee waivers based on their relationship with the bank or account type.",
    },
    {
      question: "How do I assist an elderly customer who seems confused about their banking?",
      answer: "Speak clearly and patiently, offer to sit in a private area, provide information in writing, suggest involving a trusted family member if appropriate, and be alert for signs of potential financial exploitation or diminished capacity.",
    },
    {
      question: "What's the best way to explain overdraft fees to a customer?",
      answer: "Use simple language to explain when overdraft fees occur, review the specific transactions that triggered the fees, discuss overdraft protection options, and determine if the customer qualifies for a one-time fee reversal based on their account history.",
    },
    {
      question: "How do I handle a customer requesting a fee reversal?",
      answer: "Review their account history for previous reversals, consider their relationship length and account standing, check if the fee resulted from bank error, and use your discretion based on bank policies. Document the reason if you approve the reversal.",
    },
    {
      question: "What should I do if a customer disputes a transaction they don't recognize?",
      answer: "Review the transaction details with the customer, check if it could be from a merchant using a different business name, offer to help file a dispute form if they don't recognize it, and explain the investigation process and timeline.",
    },
    {
      question: "How do I assist a customer who wants to make changes to their trust account?",
      answer: "Verify their identity and authority to make changes, request updated trust documentation, consult with the legal department on required forms, and process the changes according to both trust terms and bank procedures.",
    },
    {
      question: "What's the protocol for assisting a customer who doesn't speak English well?",
      answer: "Access the bank's translation services, use bilingual staff if available, provide forms in their preferred language if available, and ensure they fully understand all transactions and agreements before proceeding.",
    },
    {
      question: "How do I handle a situation where a customer is being disruptive?",
      answer: "Remain calm and professional, ask them to step to a private area, listen to their concerns, offer solutions if possible, and if necessary, involve a manager. For threats or safety concerns, follow security protocols and alert branch security.",
    },
    {
      question: "What should I do if a customer wants to exchange damaged currency?",
      answer: "Examine the currency to ensure it's genuine and meets the requirements for exchange (at least 51% intact). Complete the appropriate forms, document the exchange, and follow procedures for submitting the damaged currency to the Federal Reserve if required.",
    },

    // New Branch Operations Q&A
    {
      question: "What's the procedure for opening the branch vault?",
      answer: "Follow dual control protocols requiring two authorized employees with separate codes/keys. Document the time and reason for access, record all currency removed or added, and ensure the vault is properly secured after use according to bank procedures.",
    },
    {
      question: "How do I process a large cash deposit?",
      answer: "Count the cash in the presence of the customer, issue a receipt, complete Currency Transaction Report if over $10,000, verify the source of funds if necessary, and follow bank procedures for handling and securing large amounts of cash.",
    },
    {
      question: "What should I do if the cash drawer is over or short at the end of my shift?",
      answer: "Recount all cash, check for calculation errors, review all transactions for the day, document the discrepancy regardless of amount, complete the appropriate forms, and notify your supervisor according to bank procedures.",
    },
    {
      question: "How do I verify a bank check or cashier's check?",
      answer: "Examine security features including watermarks and color-shifting ink, verify the check number in the system, call the issuing bank to confirm validity for large amounts, and place appropriate holds according to bank policy.",
    },
    {
      question: "What's the procedure for accepting a third-party check?",
      answer: "Verify both the original payee's and the third party's identifications, ensure proper endorsement by the original payee, have the third party endorse in your presence, and apply appropriate check holds according to bank policy.",
    },
    {
      question: "How do I process a wire transfer request?",
      answer: "Verify the customer's identity, complete the wire transfer form with all required information (including beneficiary details and routing numbers), confirm the amount and fees, obtain proper authorization, and follow dual verification procedures for large transfers.",
    },
    {
      question: "What should I do during a bank robbery?",
      answer: "Remain calm, comply with demands, do not be a hero, activate silent alarms if possible without being detected, observe details about the perpetrators, and contact law enforcement immediately once safe to do so. Follow all established security protocols.",
    },
    {
      question: "How do I handle counterfeit currency?",
      answer: "Do not return suspected counterfeit notes to the customer, complete a Counterfeit Note Report, obtain customer information if possible, secure the note in a protective covering without further handling, and contact local law enforcement and the Secret Service.",
    },
    {
      question: "What's the protocol for a power outage at the branch?",
      answer: "Secure all cash drawers and sensitive information, assist customers currently in the branch, implement manual transaction procedures if available, contact facilities management and IT support, and follow management direction regarding branch closure if necessary.",
    },
    {
      question: "How do I submit a Currency Transaction Report (CTR)?",
      answer: "Complete the FinCEN Form 112 with customer information, identification details, and transaction information. Submit the form electronically through the bank's BSA filing system within 15 days of the transaction date.",
    },

    // New Investment & Wealth Management Q&A
    {
      question: "What's the difference between a traditional IRA and a Roth IRA?",
      answer: "Traditional IRAs use pre-tax contributions with tax-deferred growth and taxable withdrawals in retirement. Roth IRAs use after-tax contributions with tax-free growth and qualified withdrawals. Income limits apply for Roth contributions but not for traditional IRA contributions.",
    },
    {
      question: "How do I help a customer open a brokerage account?",
      answer: "Collect identification, complete new account forms including investment objectives and risk tolerance, verify employment and financial information, explain fee structures, obtain required signatures, and submit the application to the investment department for processing.",
    },
    {
      question: "What should I do if a customer asks for investment advice?",
      answer: "Unless you're a licensed financial advisor, explain that you can provide general information but not specific investment advice. Offer to schedule an appointment with a qualified financial advisor from the bank's wealth management team.",
    },
    {
      question: "How do I process a 401(k) rollover request?",
      answer: "Verify the customer has eligible funds to roll over, help them complete the direct rollover form to avoid tax penalties, explain the investment options available, and coordinate with both the current plan administrator and the bank's retirement specialists.",
    },
    {
      question: "What's the process for helping a customer set up a college savings plan?",
      answer: "Discuss 529 plans and education savings account options, explain tax advantages and contribution limits, collect account owner and beneficiary information, assist with investment selection based on the child's age, and complete all required paperwork.",
    },
    {
      question: "How do I refer a high-net-worth customer to private banking services?",
      answer: "Identify customers who meet the minimum asset requirements (typically $1 million+), highlight the exclusive benefits of private banking, arrange an introduction with a private banker, and follow the bank's referral process to ensure proper tracking and handoff.",
    },
    {
      question: "What should I explain to a customer interested in a Certificate of Deposit (CD)?",
      answer: "Cover the term length options, interest rates, early withdrawal penalties, minimum deposit requirements, renewal options, and FDIC insurance coverage. Help them compare CD rates with other savings options based on their timeframe and goals.",
    },
    {
      question: "How do I assist a customer with required minimum distributions from retirement accounts?",
      answer: "Verify the customer's age and account details, explain the RMD rules and calculation methods, discuss tax implications, help them set up a withdrawal schedule (one-time or periodic), and ensure they understand the penalties for missed RMDs.",
    },
    {
      question: "What information should I collect for a trust account opening?",
      answer: "Request the complete trust document, trustee identification, beneficiary information, tax identification number for the trust, initial deposit information, and have all trustees present to sign the necessary account agreements.",
    },
    {
      question: "How do I explain mutual fund fees and expense ratios to a customer?",
      answer: "Break down the components of expense ratios (management fees, administrative costs, 12b-1 fees), explain sales loads if applicable (front-end, back-end), and help them understand how these fees impact their investment returns over time.",
    },

    // New Business Banking Q&A
    {
      question: "What documents are needed to open a business bank account?",
      answer: "Request business formation documents (articles of incorporation, LLC agreement, etc.), EIN verification, business license, ownership identification documents, and a resolution authorizing account opening. Requirements vary based on business structure.",
    },
    {
      question: "How do I set up a merchant services account for a business customer?",
      answer: "Collect business financial information, processing volume estimates, and verification of business legitimacy. Complete the merchant application, explain fee structures and equipment options, and submit for underwriting approval.",
    },
    {
      question: "What's the difference between a business checking account and a business analysis account?",
      answer: "Business checking typically has set monthly fees and transaction limits suitable for smaller businesses. Business analysis accounts assess fees based on account activity but offer earnings credits to offset fees, making them better for high-transaction businesses.",
    },
    {
      question: "How do I help a business customer set up ACH origination services?",
      answer: "Verify the business meets eligibility requirements, help complete the application, explain security protocols and authorization requirements, set up proper user controls, and coordinate implementation with the treasury management department.",
    },
    {
      question: "What should I review when processing a business loan application?",
      answer: "Review business financial statements, tax returns, cash flow projections, business plans, owner personal financial information, collateral documentation, industry analysis, and debt service coverage ratios. Document all findings according to lending guidelines.",
    },
    {
      question: "How do I set up a business customer with remote deposit capture?",
      answer: "Verify eligibility based on account history and business needs, assist with the application, explain equipment options and fees, schedule installation and training, and review deposit limits and funds availability timelines.",
    },
    {
      question: "What's the process for adding signers to a business account?",
      answer: "Obtain a resolution from the authorized business representatives, collect identification and signatures from new signers, verify their roles within the company, update the signature card, and modify online banking access if applicable.",
    },
    {
      question: "How do I help a business customer with international wire transfers?",
      answer: "Collect recipient's complete banking information including SWIFT/BIC codes, explain currency conversion fees and processing timelines, verify the business purpose of the transfer, obtain proper authorization, and complete all required compliance documentation.",
    },
    {
      question: "What should I explain about business credit cards to a new applicant?",
      answer: "Cover credit limits, employee card options, rewards programs, expense management tools, payment terms, interest rates, annual fees, and liability (personal guarantee vs. corporate liability) depending on the business structure and history.",
    },
  ];

  const inputRef = useRef();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedSuggestionIndex, setSelectedSuggestionIndex] = useState(-1);

  const handleSend = () => {
    if (!userInput.trim()) return;

    const userMessage = { sender: "user", text: userInput };
    const found = qaPairs.find((pair) => userInput.toLowerCase().includes(pair.question.toLowerCase().slice(0, 10)));

    const botMessage = {
      sender: "bot",
      text: found ? found.answer : "I'm sorry, I don't have an answer for that. Please try another loan-related question.",
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setUserInput("");
    setSuggestions([]);
  };

  const getTopSuggestions = (input) => {
    if (!input) return [];

    const scores = qaPairs.map((pair) => ({
      question: pair.question,
      score: similarityScore(pair.question.toLowerCase(), input.toLowerCase()),
    }));

    return scores
      .sort((a, b) => b.score - a.score)
      .slice(0, 3)
      .map((item) => item.question);
  };

  const similarityScore = (text, input) => {
    const inputWords = input.split(" ");
    return inputWords.reduce((acc, word) => (text.includes(word) ? acc + 1 : acc), 0);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setUserInput(value);
    setSuggestions(getTopSuggestions(value));
    setSelectedSuggestionIndex(-1); // Reset selection
  };

  return (
    <div className='app-container'>
      <h2>💬 Loan Officer Chatbot</h2>

      <div className='chat-box'>
        {messages.map((msg, idx) => (
          <div key={idx} className={msg.sender === "user" ? "msg user-msg" : "msg bot-msg"}>
            <strong>{msg.sender === "user" ? "You" : "Bot"}:</strong> {msg.text}
          </div>
        ))}
      </div>

      <div className='suggestions-box'>
        {suggestions.map((s, idx) => (
          <div
            key={idx}
            className={`suggestion-item ${idx === selectedSuggestionIndex ? "highlighted" : ""}`}
            onClick={() => {
              setUserInput(s);
              setSuggestions([]);
              setSelectedSuggestionIndex(-1);
              inputRef.current?.focus();
            }}>
            🔍 {s}
          </div>
        ))}
      </div>

      <div className='input-box'>
        <input
          ref={inputRef}
          className='chat-input'
          type='text'
          value={userInput}
          onChange={handleInputChange}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (selectedSuggestionIndex >= 0 && suggestions[selectedSuggestionIndex]) {
                setUserInput(suggestions[selectedSuggestionIndex]);
                setSuggestions([]);
                setSelectedSuggestionIndex(-1);
              } else {
                handleSend();
              }
            } else if (e.key === "ArrowUp") {
              e.preventDefault();
              setSelectedSuggestionIndex((prev) => Math.max(prev - 1, 0));
            } else if (e.key === "ArrowDown") {
              e.preventDefault();
              setSelectedSuggestionIndex((prev) => Math.min(prev + 1, suggestions.length - 1));
            }
          }}
          placeholder='Type your question...'
        />
        <button className='send-button' onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
