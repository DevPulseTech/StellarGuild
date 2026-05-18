/* ==========================================================================
   StellarGuild Mock Database
   ========================================================================== */
const OPPORTUNITIES_DATABASE = [
    {
        id: "opp-1",
        type: "bounty",
        title: "Soroban Multi-sig Contract Bounties",
        creator: "Stellar Development Foundation",
        creatorAvatar: "https://api.dicebear.com/7.x/identicon/svg?seed=sdf",
        reward: "1,500 XLM",
        desc: "Implement a highly secure, audit-ready multi-signature wallet contract using Soroban SDK. The contract must support customizable threshold weights, signers lists, and expiration logic.",
        skills: ["Rust", "Soroban", "Smart Contract"],
        date: "2 days left",
        status: "Active"
    },
    {
        id: "opp-2",
        type: "grant",
        title: "Ecosystem Micro-grants: Soroban DeFi Adaptors",
        creator: "Soroban DeFi Labs",
        creatorAvatar: "https://api.dicebear.com/7.x/identicon/svg?seed=defi",
        reward: "Up to $25k",
        desc: "Build adapter libraries connecting core AMM protocols with Freighter Wallet and Stellar ledger primitives. Requires clean, document-heavy APIs.",
        skills: ["Rust", "Soroban", "React", "Stellar SDK"],
        date: "Ends June 10",
        status: "Active"
    },
    {
        id: "opp-3",
        type: "hackathon",
        title: "Stellar Meridian Hackathon 2026",
        creator: "SDF Events",
        creatorAvatar: "https://api.dicebear.com/7.x/identicon/svg?seed=meridian",
        reward: "$150,000 Pool",
        desc: "An ecosystem-wide sprint targeting real-world asset (RWA) tokenization, smart contract payments, and credit routing networks. Gather your squad today!",
        skills: ["Rust", "Soroban", "React", "Node.js", "UI Design"],
        date: "Starts May 25",
        status: "Active"
    },
    {
        id: "opp-4",
        type: "job",
        title: "Frontend Integration Engineer (Freighter Support)",
        creator: "LumenPay Systems",
        creatorAvatar: "https://api.dicebear.com/7.x/identicon/svg?seed=lumenpay",
        reward: "$6,500 / Month",
        desc: "Develop modern, fluid React integration frameworks for Freighter wallet. Build reusable widget libraries supporting fee estimation and Soroban XDR diagnostic tools.",
        skills: ["React", "UI Design", "Stellar SDK"],
        date: "Full-Time Job",
        status: "Active"
    },
    {
        id: "opp-5",
        type: "bounty",
        title: "Optimized Go SDK wrapper for Soroban CLI",
        creator: "Stellar Builders Alliance",
        creatorAvatar: "https://api.dicebear.com/7.x/identicon/svg?seed=alliance",
        reward: "3,200 XLM",
        desc: "Create a lightweight, performance-tuned Go library that wraps common Soroban CLI commands for deployment, contract invocations, and sandbox state resets.",
        skills: ["Go", "Soroban"],
        date: "5 days left",
        status: "Active"
    },
    {
        id: "opp-6",
        type: "job",
        title: "Technical Writer: Soroban Security Best Practices",
        creator: "SDF Dev Relations",
        creatorAvatar: "https://api.dicebear.com/7.x/identicon/svg?seed=relations",
        reward: "$3,000 / Flat",
        desc: "Author three core guides documenting common security vectors in Soroban contracts. Cover re-entrancy vectors, storage cost optimization, and contract upgrade hazards.",
        skills: ["Technical Writing", "Soroban"],
        date: "Contract Job",
        status: "Active"
    }
];

const DIRECTORY_DATABASE = [
    {
        name: "Elena Rostova",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=elena",
        role: "Soroban Smart Contract Engineer",
        reputation: "98 Score",
        skills: ["Rust", "Soroban", "Go"],
        github: "github.com/elena-rust"
    },
    {
        name: "Marcus Vance",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=marcus",
        role: "Frontend UX Specialist",
        reputation: "92 Score",
        skills: ["React", "UI Design", "Stellar SDK"],
        github: "github.com/marcusv"
    },
    {
        name: "Amara Kante",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=amara",
        role: "Ecosystem Builder & Educator",
        reputation: "95 Score",
        skills: ["Technical Writing", "Stellar SDK", "Soroban"],
        github: "github.com/amara-k"
    },
    {
        name: "Yuki Tanaka",
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=yuki",
        role: "Full-Stack Web3 Developer",
        reputation: "94 Score",
        skills: ["Rust", "React", "Node.js", "Stellar SDK"],
        github: "github.com/yuki-dev"
    }
];

const MOCK_NEWS_UPDATES = [
    { icon: "⚡", title: "New Bounty Posted", text: "SDF added 'Optimized Go SDK wrapper' worth 3,200 XLM.", time: "10m ago" },
    { icon: "🏆", title: "Quest Solved", text: "Elena Rostova successfully compiled Quest 4: Multi-sig Escrow.", time: "32m ago" },
    { icon: "🌊", title: "Wave 18 Applications", text: "Forge AI optimized 14 application proposal structures today.", time: "1h ago" },
    { icon: "🚀", title: "Soroban CLI v21.4 Released", text: "Enhanced contract validation protocols and faster local sandboxing.", time: "3h ago" }
];

/* ==========================================================================
   Global App States
   ========================================================================== */
let selectedQuest = 2; // Default starting interactive quest
let isWalletConnected = false;
let userXP = 750;
let userXLM = 420;
let userSkillsSet = new Set(["Rust", "Soroban", "React"]);

/* ==========================================================================
   Initialization on Load
   ========================================================================== */
document.addEventListener("DOMContentLoaded", () => {
    // Nav tab routing
    initNavigation();
    
    // Populate Dashboard Mockup Git contribution grid
    initGitContributionGrid();
    
    // Load opportunities boards
    renderOpportunities("all");
    renderDashboardRecommendations();
    
    // Load directory talents
    renderDirectory("all");
    
    // Populating news feed list
    renderNewsFeed();
    
    // Set active listeners
    initEventListeners();
    
    // Compute initial AI matches
    runMatchmaker();
});

/* ==========================================================================
   1. Tabbed Navigation Logic
   ========================================================================== */
function initNavigation() {
    const navButtons = document.querySelectorAll(".nav-btn");
    const tabContents = document.querySelectorAll(".tab-content");

    navButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            const targetTab = btn.getAttribute("data-target");
            
            // Toggle sidebar active highlights
            navButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            // Toggle corresponding view screens
            tabContents.forEach(tab => {
                tab.classList.remove("active");
                if (tab.id === `${targetTab}-section`) {
                    tab.classList.add("active");
                }
            });
            
            // Reset main scroll pane back to top
            document.querySelector(".scroll-pane").scrollTop = 0;
        });
    });
}

/* ==========================================================================
   2. Wallet Connector Mockup
   ========================================================================== */
function toggleWalletConnection() {
    const btn = document.getElementById("btn-wallet-connect");
    const walletText = document.getElementById("wallet-text");
    
    if (!isWalletConnected) {
        // Connect Wallet
        isWalletConnected = true;
        btn.classList.add("connected");
        walletText.innerHTML = "GB34...SDFG (Level 3)";
        btn.querySelector(".wallet-icon-holder").innerHTML = "🔓";
        showToast("Connected Freighter wallet address: GB34...SDFG");
    } else {
        // Disconnect Wallet
        isWalletConnected = false;
        btn.classList.remove("connected");
        walletText.innerHTML = "Connect Freighter";
        btn.querySelector(".wallet-icon-holder").innerHTML = "🔒";
        showToast("Disconnected wallet");
    }
}

/* ==========================================================================
   3. GitHub Contribution Grid Generator
   ========================================================================== */
function initGitContributionGrid() {
    const grid = document.getElementById("github-contrib-grid");
    if (!grid) return;
    grid.innerHTML = "";
    
    // Build 7 rows * 35 columns = 245 grid blocks
    for (let i = 0; i < 245; i++) {
        const cell = document.createElement("div");
        cell.classList.add("grid-cell");
        
        // Randomly assign green-cyan levels to simulate actual active work (weighted toward lower level activity)
        const rand = Math.random();
        let level = 0;
        if (rand > 0.85) level = 4;
        else if (rand > 0.7) level = 3;
        else if (rand > 0.5) level = 2;
        else if (rand > 0.25) level = 1;
        
        cell.classList.add(`level-${level}`);
        
        // Dynamic tooltip displaying mock commits count
        let commits = level === 0 ? "No" : level === 1 ? "1 commit" : `${level * 2 + Math.floor(Math.random() * 2)} commits`;
        cell.title = `${commits} on May ${Math.floor(Math.random() * 28) + 1}, 2026`;
        
        grid.appendChild(cell);
    }
}

/* ==========================================================================
   4. Render Opportunities Hub & Filters
   ========================================================================== */
function renderOpportunities(filterType = "all", searchText = "") {
    const grid = document.getElementById("opportunities-grid");
    if (!grid) return;
    grid.innerHTML = "";
    
    let filteredList = OPPORTUNITIES_DATABASE;
    
    // Category Filter
    if (filterType !== "all") {
        filteredList = filteredList.filter(opp => opp.type === filterType);
    }
    
    // Search text Filter
    if (searchText) {
        const lowerSearch = searchText.toLowerCase();
        filteredList = filteredList.filter(opp => 
            opp.title.toLowerCase().includes(lowerSearch) ||
            opp.desc.toLowerCase().includes(lowerSearch) ||
            opp.skills.some(skill => skill.toLowerCase().includes(lowerSearch))
        );
    }
    
    if (filteredList.length === 0) {
        grid.innerHTML = `<div class="card glass-card w-full" style="grid-column: 1/-1; padding: 40px; text-align: center;">
            <h3>No opportunities found</h3>
            <p style="color: var(--text-muted); margin-top: 10px;">Try adjusting your skill search keywords or category tabs.</p>
        </div>`;
        return;
    }
    
    filteredList.forEach(opp => {
        const card = document.createElement("div");
        card.classList.add("opportunity-card");
        card.setAttribute("onclick", `openOpportunityDetails("${opp.id}")`);
        
        const badgeClass = opp.type;
        const badgeLabel = opp.type.charAt(0).toUpperCase() + opp.type.slice(1);
        
        card.innerHTML = `
            <div class="card-top">
                <span class="opp-badge ${badgeClass}">${badgeLabel}</span>
                <span class="reward-tag">${opp.reward}</span>
            </div>
            <h3>${opp.title}</h3>
            <div class="opp-creator">
                <img class="creator-avatar" src="${opp.creatorAvatar}" alt="${opp.creator}">
                <span>${opp.creator}</span>
            </div>
            <p class="opp-desc">${opp.desc.substring(0, 100)}...</p>
            <div class="skills-wrapper">
                ${opp.skills.map(s => `<span class="skill-tag">${s}</span>`).join("")}
            </div>
            <div class="card-action-bar">
                <span class="opp-date">⌛ ${opp.date}</span>
                <button class="btn-opp-action">Claim Details ➔</button>
            </div>
        `;
        
        grid.appendChild(card);
    });
}

// Render Subset recommendations for developer command center (dashboard)
function renderDashboardRecommendations() {
    const list = document.getElementById("dashboard-recommendations");
    if (!list) return;
    list.innerHTML = "";
    
    // Choose 3 opportunities matching core skills (Rust/React/Soroban)
    const recs = OPPORTUNITIES_DATABASE.slice(0, 3);
    
    recs.forEach(opp => {
        const item = document.createElement("div");
        item.classList.add("opportunity-card");
        item.setAttribute("onclick", `openOpportunityDetails("${opp.id}")`);
        
        item.innerHTML = `
            <div class="card-top">
                <span class="opp-badge ${opp.type}">${opp.type}</span>
                <span class="reward-tag">${opp.reward}</span>
            </div>
            <h3>${opp.title}</h3>
            <p class="opp-desc">${opp.desc.substring(0, 85)}...</p>
            <div class="skills-wrapper">
                ${opp.skills.map(s => `<span class="skill-tag">${s}</span>`).join("")}
            </div>
            <div class="card-action-bar">
                <span class="opp-date">${opp.date}</span>
                <button class="btn-opp-action">View details ➔</button>
            </div>
        `;
        list.appendChild(item);
    });
}

/* ==========================================================================
   5. Interactive Modal Framework
   ========================================================================== */
window.openOpportunityDetails = function(id) {
    const opp = OPPORTUNITIES_DATABASE.find(o => o.id === id);
    if (!opp) return;
    
    const modal = document.getElementById("opportunity-modal");
    const body = document.getElementById("modal-opp-body");
    const title = document.getElementById("modal-opp-title");
    
    title.innerHTML = `Ecosystem Contribution Plan`;
    
    // Calculate matching percentage based on user's active skills
    const matchingSkills = opp.skills.filter(s => userSkillsSet.has(s));
    const matchPct = Math.round((matchingSkills.length / opp.skills.length) * 100);
    
    body.innerHTML = `
        <div class="modal-detail-layout">
            <div class="modal-detail-header">
                <div class="modal-detail-meta">
                    <span class="opp-badge ${opp.type}" style="width: fit-content;">${opp.type.toUpperCase()}</span>
                    <h2 style="font-family: var(--font-heading); color: white; margin-top: 8px;">${opp.title}</h2>
                    <span style="font-size: 0.82rem; color: var(--text-muted);">Offered by <strong>${opp.creator}</strong></span>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 1.5rem; font-weight: 800; color: white;">${opp.reward}</div>
                    <span style="font-size: 0.72rem; color: var(--accent-cyan); font-weight: 700;">${matchPct}% SKILL MATCH</span>
                </div>
            </div>
            
            <p class="modal-desc">${opp.desc}</p>
            
            <div class="modal-specs">
                <div class="spec-item">
                    <span>Project Difficulty</span>
                    <strong>Medium Specialist</strong>
                </div>
                <div class="spec-item">
                    <span>Deadline Timeline</span>
                    <strong>${opp.date}</strong>
                </div>
                <div class="spec-item">
                    <span>Required Tech Stack</span>
                    <strong>${opp.skills.join(", ")}</strong>
                </div>
                <div class="spec-item">
                    <span>Escrow Status</span>
                    <strong style="color: var(--accent-emerald);">✓ Funded via SDF Escrow</strong>
                </div>
            </div>
            
            <div style="display: flex; gap: 12px; margin-top: 10px;">
                <button class="action-btn primary" style="flex: 1;" onclick="submitOpportunityClaim('${opp.title}')">
                    Apply with StellarGuild Profile 🚀
                </button>
                <button class="action-btn outline" onclick="closeModal()">Close Details</button>
            </div>
        </div>
    `;
    
    modal.classList.add("active");
};

window.submitOpportunityClaim = function(title) {
    closeModal();
    showToast(`Claim proposal submitted for "${title}"! Recomputing matchmaking embedding...`);
};

function closeModal() {
    const modal = document.getElementById("opportunity-modal");
    modal.classList.remove("active");
}

/* ==========================================================================
   6. AI Matchmaker Core Logic
   ========================================================================== */
function toggleMatchmakerSkill(btn) {
    btn.classList.toggle("active");
}

function runMatchmaker() {
    const resultsContainer = document.getElementById("matchmaker-results");
    if (!resultsContainer) return;
    resultsContainer.innerHTML = "";
    
    // 1. Scan selected skills
    const selectedSkills = [];
    const activeTags = document.querySelectorAll("#matchmaker-skills-list .skill-tag-toggle.active");
    activeTags.forEach(tag => selectedSkills.push(tag.getAttribute("data-skill")));
    
    // 2. Read availability range
    const hours = document.getElementById("matchmaker-hours").value;
    
    // 3. Read description text keywords
    const descText = document.getElementById("matchmaker-description").value.toLowerCase();
    
    // Calculate matching scores for each database item
    const computedMatches = OPPORTUNITIES_DATABASE.map(opp => {
        let score = 0;
        
        // Skill factor (50% max)
        const matchedSkills = opp.skills.filter(s => selectedSkills.includes(s));
        const skillFactor = opp.skills.length > 0 ? (matchedSkills.length / opp.skills.length) * 50 : 50;
        score += skillFactor;
        
        // Keywords semantic search simulation (30% max)
        let descMatchCount = 0;
        opp.skills.forEach(skill => {
            if (descText.includes(skill.toLowerCase())) descMatchCount++;
        });
        if (descText.includes("defi") && opp.title.toLowerCase().includes("defi")) score += 10;
        if (descText.includes("wallet") && opp.title.toLowerCase().includes("multi-sig")) score += 10;
        if (descText.includes("speed") || descText.includes("performance")) score += 10;
        
        score += Math.min(descMatchCount * 10, 30);
        
        // Availability variance multiplier (20% max)
        // Grants are suited for high availability, Bounties for small
        let availFactor = 20;
        if (opp.type === "grant" && hours < 15) availFactor = 5;
        if (opp.type === "job" && hours < 30) availFactor = 8;
        score += availFactor;
        
        // Constrain matching between 30% and 99%
        score = Math.max(34, Math.min(Math.round(score), 99));
        
        return {
            ...opp,
            matchScore: score
        };
    });
    
    // Sort highest matching project to lowest
    computedMatches.sort((a, b) => b.matchScore - a.matchScore);
    
    // Render
    computedMatches.forEach(match => {
        const item = document.createElement("div");
        item.classList.add("match-result-item");
        
        const pillClass = match.matchScore > 80 ? "high" : "";
        
        item.innerHTML = `
            <div class="match-top-row">
                <span class="match-title">${match.title}</span>
                <span class="match-percentage-pill ${pillClass}">${match.matchScore}% Match</span>
            </div>
            <p class="match-desc">${match.desc.substring(0, 95)}...</p>
            <div class="match-top-row">
                <div class="match-skills">
                    ${match.skills.map(s => `<span class="skill-tag">${s}</span>`).join("")}
                </div>
                <button class="match-btn" onclick="openOpportunityDetails('${match.id}')">Apply Bounties ➔</button>
            </div>
        `;
        
        resultsContainer.appendChild(item);
    });
}

/* ==========================================================================
   7. Soroban Interactive Quest Simulator
   ========================================================================== */
function runSorobanCompiler() {
    const code = document.getElementById("code-editor-area").value;
    const output = document.getElementById("quest-terminal-output");
    const status = document.getElementById("term-status");
    
    status.innerHTML = "Compiling...";
    status.className = "terminal-status compiling";
    output.innerHTML = "Compiling Cargo workspace...\nFetching dependencies: [soroban-sdk v21.0.0]\nRunning semantic analysis on lib.rs...";
    
    setTimeout(() => {
        // Real compilation log output simulator
        output.innerHTML += "\nCompiling contract counter...\nFinished dev [unoptimized + debuginfo] target(s) in 1.48s\n\nRunning 2 tests...";
        
        setTimeout(() => {
            // Check if user changed count += 0; to actually incrementing (count += 1; count += 1 ; count = count + 1;)
            const fixedPattern = /count\s*\+=\s*1|count\s*=\s*count\s*\+\s*1/g;
            
            if (fixedPattern.test(code)) {
                // Success case
                status.innerHTML = "Success";
                status.className = "terminal-status success";
                output.innerHTML += `
\ntest tests::test_increment ... ok
test tests::test_storage_persistence ... ok

test result: ok. 2 passed; 0 failed; 0 ignored; 0 measured; 0 filtered out; finished in 0.02s

🎉 SOROBAN COMPILER SUCCESS: Contract matches cryptographic instance validation.
Badge 'Soroban Specialist' has been unlocked and verified!`;
                
                // Show celebration popup
                setTimeout(() => {
                    triggerCelebration();
                }, 800);
                
            } else {
                // Failure case
                status.innerHTML = "Assert Failure";
                status.className = "terminal-status error";
                output.innerHTML += `
\ntest tests::test_increment ... FAILED
test tests::test_storage_persistence ... ok

failures:

---- tests::test_increment stdout ----
thread 'tests::test_increment' panicked at 'assertion failed: \`(left == right)\`
  left: \`0\`,
 right: \`1\`: Increment function did not write the correct incremental value in storage sandbox instance.', src/lib.rs:24:9

failures:
    tests::test_increment

test result: FAILED. 1 passed; 1 failed; 0 measured; finished in 0.01s

❌ COMPILER EXECUTOR FAILURE: The contract builds successfully, but the test suite assert failed.
Did you forget to fix the increment logic inside 'TODO: Increment the count value by 1'? Currently the value increases by 0.`;
            }
        }, 1200);
    }, 1000);
}

function triggerCelebration() {
    const dialog = document.getElementById("badge-celebration");
    dialog.classList.add("active");
    
    // Add XP & XLM to user stats
    userXP = 1000;
    userXLM = 420 + 250;
    
    // Update dashboard and sidebar
    document.getElementById("dashboard-xp-val").innerText = "1000 XP";
    document.getElementById("dashboard-xlm-val").innerText = "670 XLM";
    
    const sidebar = document.querySelector(".sidebar-profile-card");
    sidebar.querySelector(".xp-labels span:first-child").innerText = "XP: 1000 / 1000";
    sidebar.querySelector(".xp-labels span:last-child").innerText = "100%";
    sidebar.querySelector(".xp-fill").style.width = "100%";
    sidebar.querySelector(".profile-level-badge").innerText = "Level 4 Contributor";
    
    // Add new badge into sidebar
    const badgesRow = sidebar.querySelector(".reputation-badges-row");
    if (badgesRow && !badgesRow.innerHTML.includes("🏆")) {
        badgesRow.innerHTML += `<span class="mini-badge" title="Soroban Specialist">🏆</span>`;
    }
}

/* ==========================================================================
   8. Dual AI Chatbot Streaming Actions
   ========================================================================== */
function sendChatMessage(type) {
    const input = document.getElementById(type === "eco" ? "ecosystem-chat-input" : "grant-chat-input");
    const container = document.getElementById(type === "eco" ? "ecosystem-chat-box" : "grant-chat-box");
    
    const query = input.value.trim();
    if (!query) return;
    
    // 1. Add User Message bubble
    appendChatBubble(container, "user", "👤", query);
    input.value = "";
    
    // 2. Add Loading placeholder bot bubble
    const botBubble = appendChatBubble(container, "bot", type === "eco" ? "🤖" : "📝", "...");
    
    // Scroll chat to bottom
    container.scrollTop = container.scrollHeight;
    
    // 3. Simulating LLM backend responses stream
    setTimeout(() => {
        let answer = "";
        
        if (type === "eco") {
            // Nova Ecosystem answers
            if (query.toLowerCase().includes("bounties") || query.toLowerCase().includes("opportunity")) {
                answer = `Here are the active developer bounties I retrieved from the Stellar/Soroban ecosystem index:

1. **Soroban Multi-sig Contract Bounty** (Funded: *1,500 XLM*) - Build multi-sig escrow primitives.
2. **Go SDK wrapper for CLI** (Funded: *3,200 XLM*) - Build CLI wrapper tools in Go.
3. **Soroban DeFi Adaptors** (Micro-grants: *Up to $25k*) - Connect AMM libraries with wallets.

Would you like me to analyze your skills profile and recommend the ideal one?`;
            } else if (query.toLowerCase().includes("storage") || query.toLowerCase().includes("limits")) {
                answer = `### 🧠 Understanding Soroban Storage Primitives

Soroban smart contracts utilize an advanced state storage model containing three distinct cost-optimized scopes:

* **Temporary Storage:** Low cost, short expiration. Discards data automatically after expiration. Ideal for transient protocol settings.
* **Instance Storage:** Persistent ledger entries tied directly to the contract instance metadata (e.g. administrator addresses, global configuration balances).
* **Persistent Storage:** Long-term ledger state (e.g. user balances, token properties). Never expires, but requires rental fees to cover network bloat.

To avoid transaction out-of-gas errors, always use **Temporary storage** where possible and call \`env.storage().instance().bump()\` during updates to extend expiry leases!`;
            } else {
                answer = `I scanned the Stellar developer databases for **"${query}"**. 

The mainnet network remains fully functional. There are currently **6 active bounties** matching parts of your query, alongside **3 university hackathon squads** seeking co-founders in your region. 

Let me know if you would like to draft a proposal or solve interactive quests for this topic!`;
            }
        } else {
            // Forge Proposal Optimizer answers
            if (query.toLowerCase().includes("multi-sig") || query.toLowerCase().includes("abstract")) {
                answer = `### 📝 Optimized Proposal Abstract: Decentralized Soroban Multi-signature Wallet

**Proposed Budget:** 25,000 XLM
**Category:** Open-source Developer Infrastructure

#### 1. Executive Vision
Traditional multi-signature escrows in Web3 are gas-expensive and lack flexible threshold dynamics. We propose a production-grade, audited Rust smart contract utilizing Soroban instance storage, allowing real-time participant weight adjustments, gas-less signature delegation, and automated timelocks.

#### 2. Key Milestones & Deliverables
* **Milestone 1 (Weeks 1-3):** Author core smart contract logic, write comprehensive unit tests mimicking Freighter transactions. *Cost: 10,000 XLM.*
* **Milestone 2 (Weeks 4-6):** Deploy contract to Testnet. Integrate React front-end dashboard allowing multi-wallet signing events. *Cost: 8,000 XLM.*
* **Milestone 3 (Weeks 7-8):** Security audits, technical documentation release, and public launch on Mainnet. *Cost: 7,000 XLM.*

Would you like me to refine the technical milestones or draft the security audit guidelines for Milestone 3?`;
            } else if (query.toLowerCase().includes("milestones") || query.toLowerCase().includes("critique")) {
                answer = `### 📊 Forge Proposal Milestones Critique

I analyzed your proposed milestones against the official **SDF Wave Grant Guidelines**. Here are critical optimizations to increase approval probability by **25%**:

1. **Avoid Vague Terminology:** SDF reviewers reject milestones labeled *"Researching ideas"* or *"Refining code"*. Instead, use verifiable targets like: *"Deploying audited contract bytecode to testnet at hash [X]"*.
2. **Include SDK Testing Standards:** Ensure you explicitly mention: *"Conducting integration validation using the official Soroban Rust testing suite containing >85% test coverage"*.
3. **Escrow & Funding Blocks:** Structure your budget blocks sequentially. Break milestones into payouts of **under 15,000 XLM** per phase to secure faster reviewer sign-off.`;
            } else {
                answer = `I have optimized your proposal abstract for **"${query}"**! 

I structured your technical objectives into three distinct, review-friendly milestones according to SDF Waves templates. I also included a pre-calculated budget block showing standard gas-cost allocations.

Feel free to modify the milestones or ask me to draft a complete SDF project application form!`;
            }
        }
        
        // Populate typed message bubble dynamically
        botBubble.querySelector(".msg-content").innerHTML = answer;
        container.scrollTop = container.scrollHeight;
    }, 1500);
}

function appendChatBubble(container, sender, avatar, text) {
    const bubble = document.createElement("div");
    bubble.classList.add("chat-msg", sender);
    bubble.innerHTML = `
        <div class="msg-avatar">${avatar}</div>
        <div class="msg-content"><p>${text}</p></div>
    `;
    container.appendChild(bubble);
    return bubble;
}

/* ==========================================================================
   9. Directory Rendering & Filters
   ========================================================================== */
function renderDirectory(skillFilter = "all", searchText = "") {
    const grid = document.getElementById("directory-grid");
    if (!grid) return;
    grid.innerHTML = "";
    
    let filteredList = DIRECTORY_DATABASE;
    
    if (skillFilter !== "all") {
        filteredList = filteredList.filter(talent => talent.skills.includes(skillFilter));
    }
    
    if (searchText) {
        const lowerSearch = searchText.toLowerCase();
        filteredList = filteredList.filter(talent => 
            talent.name.toLowerCase().includes(lowerSearch) ||
            talent.role.toLowerCase().includes(lowerSearch) ||
            talent.skills.some(s => s.toLowerCase().includes(lowerSearch))
        );
    }
    
    filteredList.forEach(talent => {
        const card = document.createElement("div");
        card.classList.add("talent-card");
        
        card.innerHTML = `
            <img class="talent-avatar" src="${talent.avatar}" alt="${talent.name}">
            <h3>${talent.name}</h3>
            <span class="talent-role">${talent.role}</span>
            <div class="talent-reputation">⭐ ${talent.reputation}</div>
            <div class="talent-skills">
                ${talent.skills.map(s => `<span class="skill-tag">${s}</span>`).join("")}
            </div>
            <div class="talent-footer-actions">
                <button class="btn-talent-action primary" onclick="showToast('Initiating DM with ${talent.name}')">Message</button>
                <button class="btn-talent-action sec" onclick="window.open('https://${talent.github}', '_blank')">GitHub</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

/* ==========================================================================
   10. System Live News Loop
   ========================================================================== */
function renderNewsFeed() {
    const feed = document.getElementById("dashboard-news-feed");
    if (!feed) return;
    feed.innerHTML = "";
    
    MOCK_NEWS_UPDATES.forEach(item => {
        const div = document.createElement("div");
        div.classList.add("feed-item");
        div.innerHTML = `
            <div class="feed-icon">${item.icon}</div>
            <div class="feed-details">
                <h4>${item.title}</h4>
                <p>${item.text}</p>
                <span class="feed-time">${item.time}</span>
            </div>
        `;
        feed.appendChild(div);
    });
}

// Live additions loop (every 20s, push updates dynamically)
setInterval(() => {
    const feed = document.getElementById("dashboard-news-feed");
    if (!feed) return;
    
    const templates = [
        { icon: "✨", title: "Smart Contract Deployed", text: "Yuki Tanaka pushed a Soroban counter iteration to Testnet.", time: "Just now" },
        { icon: "💼", title: "Bounty Claimed", text: "Elena Rostova claimed a 1,500 XLM transaction validator.", time: "Just now" },
        { icon: "🌍", title: "Chapter Spawned", text: "University of Lagos formed a local Stellar Developer Squad.", time: "Just now" }
    ];
    
    const roll = templates[Math.floor(Math.random() * templates.length)];
    const div = document.createElement("div");
    div.classList.add("feed-item");
    div.style.animation = "slideUpFade 0.4s ease forwards";
    div.innerHTML = `
        <div class="feed-icon">${roll.icon}</div>
        <div class="feed-details">
            <h4>${roll.title}</h4>
            <p>${roll.text}</p>
            <span class="feed-time">${roll.time}</span>
        </div>
    `;
    
    feed.insertBefore(div, feed.firstChild);
    if (feed.childNodes.length > 5) {
        feed.removeChild(feed.lastChild);
    }
}, 20000);

/* ==========================================================================
   11. Event Listeners Setup
   ========================================================================== */
function initEventListeners() {
    // Wallet connect
    const walletBtn = document.getElementById("btn-wallet-connect");
    if (walletBtn) walletBtn.addEventListener("click", toggleWalletConnection);
    
    // Wave banner action triggers Grant tab
    const waveBtn = document.getElementById("btn-apply-wave");
    if (waveBtn) {
        waveBtn.addEventListener("click", () => {
            document.getElementById("btn-nav-assistants").click();
            // Focus on Forge assistant input
            setTimeout(() => {
                const inp = document.getElementById("grant-chat-input");
                inp.focus();
                inp.value = "Draft abstract: Decentralized Multi-sig Wallet on Soroban";
            }, 300);
        });
    }
    
    // Dashboard CTA triggers Nav jumps
    const heroMatch = document.getElementById("btn-hero-match");
    if (heroMatch) {
        heroMatch.addEventListener("click", () => {
            document.getElementById("btn-nav-opportunities").click();
        });
    }
    
    const heroLearn = document.getElementById("btn-hero-learn");
    if (heroLearn) {
        heroLearn.addEventListener("click", () => {
            document.getElementById("btn-nav-quests").click();
        });
    }
    
    // Opportunities Filters inputs
    const oppSearch = document.getElementById("opp-search");
    if (oppSearch) {
        oppSearch.addEventListener("input", (e) => {
            const activeCatBtn = document.querySelector("#opp-category-selectors .filter-tab-btn.active");
            const activeType = activeCatBtn ? activeCatBtn.getAttribute("data-type") : "all";
            renderOpportunities(activeType, e.target.value);
        });
    }
    
    const oppCatSelectors = document.querySelectorAll("#opp-category-selectors .filter-tab-btn");
    oppCatSelectors.forEach(btn => {
        btn.addEventListener("click", () => {
            oppCatSelectors.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const type = btn.getAttribute("data-type");
            const searchVal = document.getElementById("opp-search").value;
            renderOpportunities(type, searchVal);
        });
    });
    
    // Directory Filters
    const dirSearch = document.getElementById("directory-search");
    if (dirSearch) {
        dirSearch.addEventListener("input", (e) => {
            const activeSkillBtn = document.querySelector("#directory-filters .dir-filter-btn.active");
            const activeSkill = activeSkillBtn ? activeSkillBtn.getAttribute("data-skill") : "all";
            renderDirectory(activeSkill, e.target.value);
        });
    }
    
    const dirSkillFilters = document.querySelectorAll("#directory-filters .dir-filter-btn");
    dirSkillFilters.forEach(btn => {
        btn.addEventListener("click", () => {
            dirSkillFilters.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");
            
            const skill = btn.getAttribute("data-skill");
            const searchVal = document.getElementById("directory-search").value;
            renderDirectory(skill, searchVal);
        });
    });
    
    // Global Header Search triggers Directory / Opportunities searches
    const globalSearch = document.getElementById("global-search-input");
    if (globalSearch) {
        globalSearch.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                const searchVal = e.target.value.trim();
                if (!searchVal) return;
                
                // Route user to Opportunities board automatically and search
                document.getElementById("btn-nav-opportunities").click();
                const oppSearch = document.getElementById("opp-search");
                oppSearch.value = searchVal;
                renderOpportunities("all", searchVal);
                showToast(`Global search route: "${searchVal}"`);
            }
        });
    }
    
    // Matchmaker dynamic inputs
    const matchmakerSkillToggles = document.querySelectorAll("#matchmaker-skills-list .skill-tag-toggle");
    matchmakerSkillToggles.forEach(toggle => {
        toggle.addEventListener("click", () => {
            toggle.classList.toggle("active");
            // Auto recompute
            runMatchmaker();
        });
    });
    
    const matchHoursRange = document.getElementById("matchmaker-hours");
    if (matchHoursRange) {
        matchHoursRange.addEventListener("input", (e) => {
            document.getElementById("match-hours-bubble").innerText = `${e.target.value} hrs/week`;
            // Auto recompute
            runMatchmaker();
        });
    }
    
    const matchmakerBtn = document.getElementById("btn-matchmaker-run");
    if (matchmakerBtn) {
        matchmakerBtn.addEventListener("click", () => {
            runMatchmaker();
            showToast("AI Matchmaker matches re-calculated with descriptions!");
        });
    }
    
    const matchmakerSync = document.getElementById("btn-matchmaker-sync");
    if (matchmakerSync) {
        matchmakerSync.addEventListener("click", () => {
            document.getElementById("matchmaker-description").value = "GitHub Bio: Passionate Web3 rustacean. Experienced deploying secure token contracts on Stellar, structuring Freighter payment loops, and managing scalable frontend react dashboards.";
            runMatchmaker();
            showToast("GitHub profile synced to Matchmaker description!");
        });
    }
    
    // Soroban compiler events
    const questRunBtn = document.getElementById("btn-quest-run");
    if (questRunBtn) questRunBtn.addEventListener("click", runSorobanCompiler);
    
    const questHintBtn = document.getElementById("btn-quest-hint");
    if (questHintBtn) {
        questHintBtn.addEventListener("click", () => {
            const output = document.getElementById("quest-terminal-output");
            output.innerHTML = `[HINT]: In Rust, variables declared with 'mut' can be modified. 
Line 12 shows 'count += 0;'. Change '0' to '1' so that each invocation of 'increment' actually writes the incremental count value.`;
        });
    }
    
    const questResetBtn = document.getElementById("btn-quest-reset");
    if (questResetBtn) {
        questResetBtn.addEventListener("click", () => {
            document.getElementById("code-editor-area").value = `use soroban_sdk::{contract, contractimpl, Env, Symbol};

#[contract]
pub struct CounterContract;

#[contractimpl]
impl CounterContract {
    pub fn increment(env: Env) -> u32 {
        let key = Symbol::new(&env, "count");
        
        // 1. Read existing value from instance storage, default to 0
        let mut count: u32 = env.storage().instance().get(&key).unwrap_or(0);
        
        // 2. TODO: Increment the count value by 1
        count += 0; // Fix this line!
        
        // 3. Write new value to instance storage
        env.storage().instance().set(&key, &count);
        
        // 4. Return new value
        count
    }
}`;
            document.getElementById("quest-terminal-output").innerHTML = "Ready to compile. Code workspace reset.";
        });
    }
    
    // Celebration claim closed
    const celebClose = document.getElementById("btn-celebration-close");
    if (celebClose) {
        celebClose.addEventListener("click", () => {
            document.getElementById("badge-celebration").classList.remove("active");
            showToast("Soroban Specialist badge minted successfully!");
        });
    }
    
    // Modals close triggers
    const modalClose = document.getElementById("btn-close-modal");
    if (modalClose) modalClose.addEventListener("click", closeModal);
    
    const modalOverlay = document.getElementById("opportunity-modal");
    if (modalOverlay) {
        modalOverlay.addEventListener("click", (e) => {
            if (e.target === modalOverlay) closeModal();
        });
    }
    
    // AI Chat inputs sends
    const ecoSend = document.getElementById("btn-ecosystem-chat-send");
    if (ecoSend) ecoSend.addEventListener("click", () => sendChatMessage("eco"));
    
    const ecoInput = document.getElementById("ecosystem-chat-input");
    if (ecoInput) {
        ecoInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") sendChatMessage("eco");
        });
    }
    
    const grantSend = document.getElementById("btn-grant-chat-send");
    if (grantSend) grantSend.addEventListener("click", () => sendChatMessage("grant"));
    
    const grantInput = document.getElementById("grant-chat-input");
    if (grantInput) {
        grantInput.addEventListener("keydown", (e) => {
            if (e.key === "Enter") sendChatMessage("grant");
        });
    }
    
    // Quick prompt buttons clicks inside chat panels
    document.querySelectorAll(".quick-prompt-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const chatType = btn.getAttribute("data-chat");
            const text = btn.getAttribute("data-text");
            
            const inp = document.getElementById(chatType === "eco" ? "ecosystem-chat-input" : "grant-chat-input");
            if (inp) {
                inp.value = text;
                sendChatMessage(chatType);
            }
        });
    });
}

/* ==========================================================================
   12. Floating Toast alerts for UX Feedback
   ========================================================================== */
function showToast(message) {
    const toast = document.createElement("div");
    toast.className = "toast-message";
    toast.innerHTML = `🌟 ${message}`;
    
    // Inject dynamic style for standalone simplicity
    Object.assign(toast.style, {
        position: "fixed",
        bottom: "32px",
        right: "32px",
        background: "rgba(10, 8, 22, 0.9)",
        border: "1px solid var(--accent-cyan)",
        boxShadow: "var(--glow-cyan)",
        color: "#fff",
        padding: "12px 24px",
        borderRadius: "10px",
        fontFamily: "var(--font-heading)",
        fontSize: "0.85rem",
        fontWeight: "600",
        zIndex: "9999",
        animation: "slideUpFade 0.3s ease forwards"
    });
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = "slideDownFadeOut 0.3s ease forwards";
        setTimeout(() => toast.remove(), 300);
    }, 4500);
}

// Inject CSS slide down animation for Toast removal
const styleSheet = document.createElement("style");
styleSheet.innerText = `
@keyframes slideDownFadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(15px); }
}
`;
document.head.appendChild(styleSheet);
