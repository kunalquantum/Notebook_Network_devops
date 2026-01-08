// State Management
const state = {
    currentPhase: 1,
    simData: {}
};

// Phase Content Data
const phases = {
    1: {
        title: "Phase 1: The Single Server",
        desc: "TravelBody starts as a simple app on one server. Learn how IP addresses, DNS, and Ports make it accessible.",
        init: initPhase1
    },
    2: {
        title: "Phase 2: Security & Segmentation",
        desc: "We need to secure the database. Learn how Subnets, Routing, and Firewalls protect data.",
        init: initPhase2
    },
    3: {
        title: "Phase 3: Private Networks (NAT)",
        desc: "Scaling up with private servers. Learn how NAT allows them to access the internet securely.",
        init: initPhase3
    },
    4: {
        title: "Phase 4: Moving to Cloud (VPC)",
        desc: "Migrating to the cloud. Understand Virtual Private Clouds (VPC) and Internet Gateways.",
        init: initPhase4
    },
    5: {
        title: "Phase 5: Containers (Docker)",
        desc: "Solving dependency hell. See how Containers differ from Servers and how Port Mapping works.",
        init: initPhase5
    },
    6: {
        title: "Phase 6: Orchestration (K8s)",
        desc: "Managing scale. Discover Pods, Services, and Ingress in a Kubernetes cluster.",
        init: initPhase6
    }
};

// DOM Elements
const narrativeTitle = document.querySelector('#narrative-content h1');
const narrativeText = document.querySelector('#narrative-content p');
const controlsArea = document.getElementById('controls-area');
const canvasContainer = document.getElementById('canvas-container');
const phaseBtns = document.querySelectorAll('.phase-btn');

// Initialization
document.addEventListener('DOMContentLoaded', () => {
    setupNavigation();
    loadPhase(1);
});

function setupNavigation() {
    phaseBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const phaseId = parseInt(btn.dataset.phase);
            loadPhase(phaseId);
        });
    });
}

function loadPhase(phaseId) {
    // Update State
    state.currentPhase = phaseId;

    // Update UI Navigation
    phaseBtns.forEach(btn => btn.classList.remove('active'));
    document.querySelector(`.phase-btn[data-phase="${phaseId}"]`).classList.add('active');

    // Update Narrative
    const phaseData = phases[phaseId];
    if (phaseData) {
        narrativeTitle.textContent = phaseData.title;
        narrativeText.textContent = phaseData.desc;

        // Clear previous View
        controlsArea.innerHTML = '';
        canvasContainer.innerHTML = '';

        // Initialize specific phase logic
        if (typeof phaseData.init === 'function') {
            phaseData.init();
        } else {
            canvasContainer.innerHTML = '<div class="placeholder-msg">Simulation coming soon...</div>';
        }
    }
}

// --- Phase 1 Logic: The Single Server ---
function initPhase1() {
    // Narrative Controls
    const controlsHtml = `
        <div class="concept-card">
            <h3>1. The Identifier (IP Address)</h3>
            <p>Every device needs a unique address. TravelBody's server lives at <code>203.0.113.10</code>.</p>
            <p><small>Analogy: Like a <strong>House Address</strong>.</small></p>
        </div>

        <div class="concept-card">
            <h3>2. DNS (Domain Name System)</h3>
            <p>Users can't remember numbers. DNS acts like a phonebook.</p>
            <p><small>Analogy: <strong>Contacts List</strong> (Mom -> 555-0199).</small></p>
            <div class="interactive-box">
                <div style="display: flex; gap: 5px; margin-bottom: 5px;">
                    <input type="text" value="travelbody.com" id="dns-input" class="code-input" readonly>
                    <button class="action-btn small" id="btn-dns">Lookup</button>
                </div>
                <div id="dns-result" class="console-output">Ready to resolve...</div>
            </div>
        </div>

        <div class="concept-card">
            <h3>3. Ports (Application Channels)</h3>
            <p>Multiple apps live on one server. Ports direct traffic to the right app.</p>
            <p><small>Analogy: <strong>Apartment Numbers</strong> in the building.</small></p>
            <div class="port-controls">
                <button class="action-btn port-btn" data-port="80" style="border-color: var(--accent-primary)">
                    <span class="icon">🌐</span> Web (:80)
                </button>
                <button class="action-btn port-btn" data-port="3306" style="border-color: var(--accent-warning)">
                    <span class="icon">💾</span> DB (:3306)
                </button>
                <button class="action-btn port-btn" data-port="9090" style="border-color: var(--accent-danger)">
                    <span class="icon">💳</span> Pay (:9090)
                </button>
            </div>
        </div>
    `;
    controlsArea.innerHTML = controlsHtml;

    // Visualizer Setup
    canvasContainer.innerHTML = `
        <!-- Server Housing -->
        <div class="sim-node server" id="server-main" style="top: 50%; left: 70%; transform: translate(-50%, -50%); width: 160px; height: 180px; justify-content: flex-start; padding-top: 15px;">
            <div class="sim-node-icon" style="font-size: 32px;">🏢</div>
            <div class="sim-node-label" style="margin-bottom: 10px;">Server<br><span style="color:var(--accent-primary)">203.0.113.10</span></div>
            
            <!-- Ports (Apartments) -->
            <div class="server-internals" style="width: 100%; padding: 0 10px; display: flex; flex-direction: column; gap: 8px;">
                <div class="port-slot" id="port-80" style="border: 1px solid var(--accent-primary);">
                    <span style="font-size:10px; color:var(--accent-primary)">Apt 80</span> <br> Web App
                </div>
                <div class="port-slot" id="port-3306" style="border: 1px solid var(--accent-warning);">
                    <span style="font-size:10px; color:var(--accent-warning)">Apt 3306</span> <br> MySQL
                </div>
                <div class="port-slot" id="port-9090" style="border: 1px solid var(--accent-danger);">
                    <span style="font-size:10px; color:var(--accent-danger)">Apt 9090</span> <br> Payment
                </div>
            </div>
        </div>
        
        <!-- User Node -->
        <div class="sim-node" id="user-node" style="top: 50%; left: 15%; transform: translate(-50%, -50%); border-color:white;">
            <div class="sim-node-icon">📱</div>
            <div class="sim-node-label">User App</div>
        </div>

        <!-- Connection Line (Visual Only) -->
        <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; opacity: 0.2;">
            <line x1="15%" y1="50%" x2="70%" y2="50%" stroke="white" stroke-width="2" stroke-dasharray="5,5" />
        </svg>
    `;

    // DNS Logic
    document.getElementById('btn-dns').addEventListener('click', () => {
        const result = document.getElementById('dns-result');
        const input = document.getElementById('dns-input');

        result.innerHTML = `<span class="blink">Searching...</span>`;
        input.style.borderColor = "var(--accent-warning)";

        setTimeout(() => {
            result.innerHTML = `Resolved: <span style="color:var(--accent-primary)">203.0.113.10</span>`;
            input.value = "203.0.113.10"; // Visual replace
            input.style.borderColor = "var(--accent-success)";

            // Flash server
            const server = document.getElementById('server-main');
            server.classList.add('pulse');
            setTimeout(() => server.classList.remove('pulse'), 1000);
        }, 1000);
    });

    // Port Buttons Logic
    document.querySelectorAll('.port-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const port = parseInt(btn.dataset.port);
            animatePacket(port);
        });
    });
}

function animatePacket(port) {
    const canvas = document.getElementById('canvas-container');
    const userNode = document.getElementById('user-node');
    const serverNode = document.getElementById('server-main');
    const portNode = document.getElementById(`port-${port}`);

    if (!portNode) return; // safety

    // Create Packet
    const packet = document.createElement('div');
    packet.classList.add('packet');
    packet.innerHTML = `<div style="font-size:8px; text-align:center; line-height:12px; color:black; font-weight:bold;">${port}</div>`;

    // Color mapping
    let color = 'white';
    if (port === 80) color = 'var(--accent-primary)';
    else if (port === 3306) color = 'var(--accent-warning)';
    else if (port === 9090) color = 'var(--accent-danger)';

    packet.style.backgroundColor = color;
    packet.style.boxShadow = `0 0 8px ${color}`;

    canvas.appendChild(packet);

    // Get coordinates
    const startRect = userNode.getBoundingClientRect();
    const endRect = portNode.getBoundingClientRect();
    const canvasRect = canvas.getBoundingClientRect();

    // Calculate relative positions
    const startX = startRect.left - canvasRect.left + startRect.width / 2;
    const startY = startRect.top - canvasRect.top + startRect.height / 2;
    const endX = endRect.left - canvasRect.left; // Aim for left edge of port slot
    const endY = endRect.top - canvasRect.top + endRect.height / 2;

    // Initial Pos
    packet.style.left = `${startX}px`;
    packet.style.top = `${startY}px`;

    // Animate
    requestAnimationFrame(() => {
        packet.style.transition = 'all 1.2s cubic-bezier(0.45, 0, 0.55, 1)';
        packet.style.left = `${endX}px`;
        packet.style.top = `${endY}px`;
    });

    // Arrival Logic
    setTimeout(() => {
        packet.remove();
        // Highlight Port Slot
        portNode.style.background = `rgba(255,255,255,0.1)`;
        const label = portNode.querySelector('span');
        const originalColor = label.style.color;
        label.style.color = 'white';
        label.style.fontWeight = 'bold';

        setTimeout(() => {
            portNode.style.background = 'transparent';
            label.style.color = originalColor;
            label.style.fontWeight = 'normal';
        }, 400);
    }, 1200);
}

// Placeholders for other phases
// --- Phase 2 Logic: Security & Segmentation ---
function initPhase2() {
    // Narrative Controls
    const controlsHtml = `
        <div class="concept-card">
            <h3>4. Subnets (Segmentation)</h3>
            <p>We divide the network to isolate resources.</p>
            <p><small>Analogy: <strong>Hospital Wings</strong> (Maternity vs Surgery).</small></p>
            <ul style="font-size: 12px; color: var(--text-muted); margin-left: 20px; list-style-type: disc;">
                <li><strong>Subnet A (Public):</strong> Frontend Web Server</li>
                <li><strong>Subnet B (Private):</strong> Backend Database</li>
            </ul>
        </div>

        <div class="concept-card">
            <h3>5 & 6. Firewalls (Traffic Control)</h3>
            <p>Filter traffic between subnets.</p>
            <p><small>Analogy: <strong>Security Guard</strong> checking badges.</small></p>
            
            <div class="firewall-controls" style="background:rgba(0,0,0,0.3); padding:10px; border-radius:6px; border:1px solid var(--border-color);">
                <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:10px;">
                    <span style="font-size:12px;">Port 3306 Rule:</span>
                    <button id="fw-toggle" class="action-btn small" style="border-color:var(--accent-danger); color:var(--accent-danger);">BLOCK ALL</button>
                    <!-- State: BLOCK ALL or ALLOW WEB -->
                </div>
                <div style="color: grey; font-size: 10px; font-style: italic;" id="fw-status">
                    Status: "Deny All" incoming to DB.
                </div>
            </div>

            <div style="margin-top: 15px;">
                <p style="font-size:12px; margin-bottom:5px;">Simulate Traffic:</p>
                <div style="display:flex; gap:10px;">
                    <button class="action-btn" id="btn-visit-web">Visit Website</button>
                    <button class="action-btn" id="btn-hack-db" style="border-color:var(--accent-danger)">Direct DB Access</button>
                </div>
            </div>
        </div>
    `;
    controlsArea.innerHTML = controlsHtml;

    // Visualizer Setup
    canvasContainer.innerHTML = `
        <!-- Router/Firewall Node -->
        <div class="sim-node" id="router-fw" style="top: 50%; left: 35%; transform: translate(-50%, -50%); width: 60px; height: 140px; border-radius: 8px; border: 2px dashed var(--accent-warning); z-index: 5;">
            <div class="sim-node-icon">🛡️</div>
            <div class="sim-node-label" style="font-size:8px; text-align:center;">Network<br>Firewall</div>
        </div>

        <!-- Subnet A: Public -->
        <div id="subnet-a" style="position: absolute; top: 10%; right: 5%; width: 200px; height: 120px; border: 2px solid var(--accent-primary); border-radius: 8px; background: rgba(59, 130, 246, 0.05);">
            <div style="position:absolute; top:-10px; left:10px; background:var(--bg-panel); padding:0 5px; font-size:10px; color:var(--accent-primary); font-weight:bold;">Subnet A (Public)</div>
            
            <!-- Web Server -->
            <div class="sim-node" id="web-server" style="top: 50%; left: 50%; transform: translate(-50%, -50%); height: 60px; width: 60px; border-color: var(--accent-primary);">
                <div style="font-size: 20px;">🌐</div>
                <div style="font-size: 8px; text-align: center;">Web Svr</div>
            </div>
        </div>

        <!-- Subnet B: Private -->
        <div id="subnet-b" style="position: absolute; bottom: 10%; right: 5%; width: 200px; height: 120px; border: 2px solid var(--accent-danger); border-radius: 8px; background: rgba(239, 68, 68, 0.05);">
            <div style="position:absolute; top:-10px; left:10px; background:var(--bg-panel); padding:0 5px; font-size:10px; color:var(--accent-danger); font-weight:bold;">Subnet B (Private)</div>
            
            <!-- DB Server -->
            <div class="sim-node" id="db-server" style="top: 50%; left: 50%; transform: translate(-50%, -50%); height: 60px; width: 60px; border-color: var(--accent-danger);">
                <div style="font-size: 20px;">💾</div>
                <div style="font-size: 8px; text-align: center;">DB Svr</div>
            </div>
        </div>

        <!-- User -->
        <div class="sim-node" id="user-p2" style="top: 50%; left: 10%; transform: translate(-50%, -50%); border-color:white;">
            <div class="sim-node-icon">👤</div>
            <div class="sim-node-label">Hacker/User</div>
        </div>
    `;

    // Internal State
    let firewallAllowWeb = false;

    // Controls Logic
    const fwBtn = document.getElementById('fw-toggle');
    const fwStatus = document.getElementById('fw-status');

    fwBtn.addEventListener('click', () => {
        firewallAllowWeb = !firewallAllowWeb;
        if (firewallAllowWeb) {
            fwBtn.textContent = "ALLOW WEB";
            fwBtn.style.color = "var(--accent-success)";
            fwBtn.style.borderColor = "var(--accent-success)";
            fwStatus.textContent = `Status: "Allow 3306" from Subnet A ONLY.`;
            // Visual feedback
            document.getElementById('router-fw').style.borderColor = "var(--accent-success)";
        } else {
            fwBtn.textContent = "BLOCK ALL";
            fwBtn.style.color = "var(--accent-danger)";
            fwBtn.style.borderColor = "var(--accent-danger)";
            fwStatus.textContent = `Status: "Deny All" incoming to DB.`;
            document.getElementById('router-fw').style.borderColor = "var(--accent-warning)";
        }
    });

    document.getElementById('btn-visit-web').addEventListener('click', () => {
        animatePhase2Packet('web');
    });

    document.getElementById('btn-hack-db').addEventListener('click', () => {
        animatePhase2Packet('db_hack');
    });

    // Sub-logic for P2 Animation
    function animatePhase2Packet(type) {
        const canvas = document.getElementById('canvas-container');
        const user = document.getElementById('user-p2');
        const fw = document.getElementById('router-fw');
        const web = document.getElementById('web-server');
        const db = document.getElementById('db-server');

        // 1. User -> Firewall
        const p = createPacket();
        canvas.appendChild(p);

        let color = type === 'db_hack' ? 'var(--accent-danger)' : 'var(--accent-primary)';
        p.style.backgroundColor = color;
        p.style.boxShadow = `0 0 8px ${color}`;

        // Move to FW
        movePacket(p, user, fw, 1000).then(() => {

            // Logic Check at Firewall
            if (type === 'web') {
                // Public Subnet Access is generally allowed (Port 80/443)
                // Move FW -> Web
                movePacket(p, fw, web, 1000).then(() => {
                    flashNode(web, 'var(--accent-primary)');
                    p.remove();

                    // Trigger internal DB call from Web?
                    setTimeout(() => {
                        const internalP = createPacket();
                        internalP.style.backgroundColor = 'var(--accent-primary)';
                        canvas.appendChild(internalP);
                        // Web -> FW (Internal routing) -> DB
                        // For simplicity, just Web -> DB line
                        movePacket(internalP, web, db, 1000).then(() => {
                            if (firewallAllowWeb) {
                                flashNode(db, 'var(--accent-success)');
                                internalP.remove();
                            } else {
                                // Blocked by Internal FW rules simulation
                                internalP.style.backgroundColor = 'red';
                                internalP.style.transform = 'scale(2)';
                                setTimeout(() => internalP.remove(), 200);
                                showToast("Blocked by Firewall Rule!");
                            }
                        });
                    }, 500);
                });
            } else if (type === 'db_hack') {
                // Direct access to Private Subnet from Public Internet is BLOCKED by default Network Firewall
                p.style.backgroundColor = 'red';
                p.style.transform = 'scale(2)';
                setTimeout(() => p.remove(), 300);
                showToast("BLOCKED: Private Subnet not accessible!");
                flashNode(fw, 'red');
            }
        });
    }

    function createPacket() {
        const p = document.createElement('div');
        p.classList.add('packet');
        // Initial pos will be set by movePacket via startNode
        return p;
    }

    function movePacket(packet, fromNode, toNode, duration) {
        return new Promise(resolve => {
            const canvasRect = document.getElementById('canvas-container').getBoundingClientRect();
            const start = fromNode.getBoundingClientRect();
            const end = toNode.getBoundingClientRect();

            // Set initial
            packet.style.left = (start.left - canvasRect.left + start.width / 2) + 'px';
            packet.style.top = (start.top - canvasRect.top + start.height / 2) + 'px';
            packet.style.transition = `all ${duration}ms linear`;

            // Force reflow
            packet.offsetWidth;

            // Set target
            packet.style.left = (end.left - canvasRect.left + end.width / 2) + 'px';
            packet.style.top = (end.top - canvasRect.top + end.height / 2) + 'px';

            setTimeout(resolve, duration);
        });
    }

    function flashNode(node, color) {
        const oldShadow = node.style.boxShadow;
        node.style.boxShadow = `0 0 20px ${color}`;
        setTimeout(() => node.style.boxShadow = oldShadow, 500);
    }

    function showToast(msg) {
        const t = document.createElement('div');
        t.innerText = msg;
        t.style.position = 'absolute';
        t.style.bottom = '20px';
        t.style.left = '50%';
        t.style.transform = 'translateX(-50%)';
        t.style.background = 'rgba(0,0,0,0.8)';
        t.style.border = '1px solid var(--accent-danger)';
        t.style.padding = '8px 16px';
        t.style.borderRadius = '4px';
        t.style.color = 'white';
        t.style.fontSize = '12px';
        canvasContainer.appendChild(t);
        setTimeout(() => t.remove(), 2000);
    }
}

// --- Phase 3 Logic: Private Networks (NAT) ---
function initPhase3() {
    // Narrative
    const controlsHtml = `
        <div class="concept-card">
            <h3>7. NAT (Network Address Translation)</h3>
            <p><strong>Problem:</strong> 50 Servers need internet (Updates), but they have Private IPs (10.0.x.x).</p>
            <p><strong>Solution:</strong> The NAT Gateway acts as a middleman.</p>
            <p><small>Analogy: <strong>The Receptionist</strong>. Employees (Private) make calls through the main line (Public). The receptionist routes return calls back to the right desk.</small></p>
        </div>

        <div class="concept-card">
            <h3>Simulation Control</h3>
            <p>Click a server to request an update from the Internet.</p>
            <div style="display: flex; gap: 10px; margin-top: 10px;">
                <button class="action-btn" onclick="startNatSim(1)">Server 1 (10.0.1.5)</button>
                <button class="action-btn" onclick="startNatSim(2)">Server 2 (10.0.2.8)</button>
            </div>
            
            <div id="nat-log" class="console-output" style="height: 60px; overflow-y:auto; border-top:1px solid var(--border-color); margin-top:10px; padding-top:5px;">
                Ready...
            </div>
        </div>
    `;
    controlsArea.innerHTML = controlsHtml;

    // Visualizer
    canvasContainer.innerHTML = `
        <!-- Internet Cloud -->
        <div class="sim-node" id="internet-cloud" style="top: 20%; left: 50%; transform: translate(-50%, -50%); width: 100px; height: 80px; border-radius: 50px; border: 2px solid white; background: rgba(255,255,255,0.1);">
            <div class="sim-node-icon">☁️</div>
            <div class="sim-node-label">Internet</div>
        </div>

        <!-- NAT Gateway -->
        <div class="sim-node" id="nat-gateway" style="top: 50%; left: 50%; transform: translate(-50%, -50%); width: 80px; height: 80px; border-color: var(--accent-warning);">
            <div class="sim-node-icon">🔄</div>
            <div class="sim-node-label">NAT GW<br><span style="color:var(--accent-warning); font-size:8px;">203.0.113.1</span></div>
        </div>

        <!-- Private Network Zone -->
        <div style="position: absolute; bottom: 5%; left: 10%; right: 10%; height: 120px; border: 2px dashed var(--accent-danger); border-radius: 8px; background: rgba(239, 68, 68, 0.05);">
            <div style="position:absolute; top:-10px; left:10px; background:var(--bg-panel); padding:0 5px; font-size:10px; color:var(--accent-danger);">Private Network (10.0.x.x)</div>
            
            <!-- Private Servers -->
            <div class="sim-node" id="svr-1" style="top: 50%; left: 30%; transform: translate(-50%, -50%); width: 60px; height: 60px; border-color: var(--accent-danger);">
                <div>💻</div>
                <div style="font-size:8px;">10.0.1.5</div>
                <div class="loading-bar" style="width:0%; height:2px; background:var(--accent-success); margin-top:2px; transition:width 0.2s;"></div>
            </div>

            <div class="sim-node" id="svr-2" style="top: 50%; left: 70%; transform: translate(-50%, -50%); width: 60px; height: 60px; border-color: var(--accent-danger);">
                <div>💻</div>
                <div style="font-size:8px;">10.0.2.8</div>
                <div class="loading-bar" style="width:0%; height:2px; background:var(--accent-success); margin-top:2px; transition:width 0.2s;"></div>
            </div>
        </div>
    `;

    // Global func
    window.startNatSim = (id) => {
        const svr = document.getElementById(`svr-${id}`);
        const nat = document.getElementById('nat-gateway');
        const net = document.getElementById('internet-cloud');
        const log = document.getElementById('nat-log');

        log.innerHTML += `<div>> Svr${id}: Requesting update... (Src: 10.0.x.x)</div>`;

        // 1. Svr -> NAT
        const p = createPacket();
        canvasContainer.appendChild(p);
        p.style.backgroundColor = 'var(--accent-danger)'; // Private IP Color

        movePacket(p, svr, nat, 800).then(() => {
            // NAT Translation
            log.innerHTML += `<div style="color:var(--accent-warning)">> NAT: Translated to Public IP (203.0.113.1)</div>`;
            flashNode(nat, 'var(--accent-warning)');
            p.style.backgroundColor = 'var(--accent-warning)'; // Public IP Color

            // 2. NAT -> Internet
            movePacket(p, nat, net, 800).then(() => {
                flashNode(net, 'white');
                // Processing...
                setTimeout(() => {
                    log.innerHTML += `<div>> Internet: Response sent.</div>`;

                    // 3. Internet -> NAT
                    movePacket(p, net, nat, 800).then(() => {
                        // NAT Lookup
                        log.innerHTML += `<div style="color:var(--accent-danger)">> NAT: Routing back to Svr${id} (10.0.x.x)</div>`;
                        flashNode(nat, 'var(--accent-warning)');
                        p.style.backgroundColor = 'var(--accent-danger)'; // Back to Private

                        // 4. NAT -> Svr
                        movePacket(p, nat, svr, 800).then(() => {
                            flashNode(svr, 'var(--accent-success)');
                            p.remove();
                            log.innerHTML += `<div style="color:var(--accent-success)">> Svr${id}: Update Received!</div>`;
                            log.scrollTop = log.scrollHeight;

                            // Visual download bar
                            const bar = svr.querySelector('.loading-bar');
                            bar.style.width = '100%';
                            setTimeout(() => bar.style.width = '0%', 2000);
                        });
                    });
                }, 500);
            });
        });
    }

    // Reuse helpers (copied from Phase 2 scope if possible, but better to duplicate or make global to avoid scope issues in this simple script)
    // For safety in this "one big script" file, I'll redefine small helpers or rely on previous if global. 
    // Ideally refactor movePacket to top level. For now, redefining for safety as I can't easily see if they are inside initPhase2. 
    // Looking at previous file view, they were inside initPhase2. So I must redefine them or move them out.
    // I will redefine them here for Phase 3 specifically.

    function createPacket() {
        const p = document.createElement('div');
        p.classList.add('packet');
        return p;
    }

    function movePacket(packet, fromNode, toNode, duration) {
        return new Promise(resolve => {
            const canvasRect = document.getElementById('canvas-container').getBoundingClientRect();
            const start = fromNode.getBoundingClientRect();
            const end = toNode.getBoundingClientRect();

            packet.style.left = (start.left - canvasRect.left + start.width / 2) + 'px';
            packet.style.top = (start.top - canvasRect.top + start.height / 2) + 'px';
            packet.style.transition = `all ${duration}ms linear`;

            packet.offsetWidth; // Reflow

            packet.style.left = (end.left - canvasRect.left + end.width / 2) + 'px';
            packet.style.top = (end.top - canvasRect.top + end.height / 2) + 'px';

            setTimeout(resolve, duration);
        });
    }

    function flashNode(node, color) {
        const oldShadow = node.style.boxShadow;
        node.style.boxShadow = `0 0 20px ${color}`;
        setTimeout(() => node.style.boxShadow = oldShadow, 500);
    }
}

// --- Phase 4 Logic: Moving to Cloud (VPC) ---
function initPhase4() {
    // Narrative
    const controlsHtml = `
        <div class="concept-card">
            <h3>8. VPC (Virtual Private Cloud)</h3>
            <p><strong>Concept:</strong> An isolated network in the cloud.</p>
            <p><small>Analogy: <strong>Private Office Floor</strong>. A locked floor in a shared building (AWS/GCP). You control the doors.</small></p>
        </div>

        <div class="concept-card">
            <h3>Component: Internet Gateway</h3>
            <p>The "Front Door" to the internet.</p>
            <div id="vpc-status" style="margin: 10px 0; font-size: 12px; color: var(--accent-danger);">
                Status: VPC Isolated (No Exit).
            </div>
            <button class="action-btn" id="btn-attach-igw">Attach Internet Gateway</button>
            
            <div style="margin-top: 15px;">
                <button class="action-btn small" id="btn-ping-google" style="opacity: 0.5; cursor: not-allowed;">Ping Internet</button>
            </div>
        </div>
    `;
    controlsArea.innerHTML = controlsHtml;

    // Visualizer
    canvasContainer.innerHTML = `
        <!-- Cloud Provider Boundary -->
        <div style="position: absolute; width: 90%; height: 90%; border: 1px dashed var(--text-muted); border-radius: 20px; opacity: 0.3;">
            <div style="position:absolute; top:10px; left:20px; font-size:14px;">☁️ Cloud Region (The Building)</div>
        </div>

        <!-- VPC (The Private Floor) -->
        <div id="vpc-box" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 300px; height: 200px; border: 3px solid var(--accent-primary); border-radius: 12px; background: rgba(15, 23, 42, 0.8);">
            <div style="position:absolute; top:-15px; left:20px; background:var(--bg-panel); padding:0 10px; color:var(--accent-primary); font-weight:bold;">My VPC (10.0.0.0/16)</div>
            
            <!-- Internal Servers -->
            <div class="sim-node" id="cld-server" style="top: 50%; left: 50%; transform: translate(-50%, -50%); border-color:white;">
                <div class="sim-node-icon">📦</div>
                <div class="sim-node-label">App Server</div>
            </div>
        </div>

        <!-- Internet Gateway (Detached initially) -->
        <div class="sim-node" id="igw-node" style="top: 10%; right: 10%; border-color: var(--accent-success); width: 80px;">
            <div class="sim-node-icon">🚪</div>
            <div class="sim-node-label">IGW</div>
        </div>
    `;

    // State
    let igwAttached = false;

    // Actions
    const btnAttach = document.getElementById('btn-attach-igw');
    const btnPing = document.getElementById('btn-ping-google');
    const status = document.getElementById('vpc-status');
    const igw = document.getElementById('igw-node');
    const vpc = document.getElementById('vpc-box');

    btnAttach.addEventListener('click', () => {
        if (!igwAttached) {
            // Animate Attachment
            igw.style.transition = "all 1s ease";

            // Move IGW to the edge of VPC box
            // VPC center is 50%, 50%. Width 300px (half 150). Height 200 (half 100).
            // We want it on the top border.
            // Using logic relative to canvas container might be safer, but let's try CSS props relative to parent (canvas)
            // Canvas Center is 50/50. 
            // VPC Top Edge is roughly 50% - 100px.

            igw.style.top = "calc(50% - 100px)"; // Top edge of VPC
            igw.style.left = "50%";
            igw.style.transform = "translate(-50%, -50%)"; // Center on the line

            setTimeout(() => {
                igwAttached = true;
                btnAttach.innerText = "Detach Internet Gateway";
                status.innerHTML = `Status: <span style="color:var(--accent-success)">Connected to Internet</span>.`;
                vpc.style.boxShadow = "0 0 30px rgba(59, 130, 246, 0.2)";

                // Enable Ping
                btnPing.style.opacity = "1";
                btnPing.style.cursor = "pointer";
            }, 1000);
        } else {
            // Detach
            igw.style.top = "10%";
            igw.style.left = "";
            igw.style.right = "10%";
            igw.style.transform = "";

            setTimeout(() => {
                igwAttached = false;
                btnAttach.innerText = "Attach Internet Gateway";
                status.innerHTML = `Status: <span style="color:var(--accent-danger)">VPC Isolated</span>.`;
                vpc.style.boxShadow = "none";

                btnPing.style.opacity = "0.5";
                btnPing.style.cursor = "not-allowed";
            }, 1000);
        }
    });

    btnPing.addEventListener('click', () => {
        if (!igwAttached) return;

        // Ping Animation
        const p = createPacket();
        canvasContainer.appendChild(p);
        p.style.backgroundColor = "white";

        const svr = document.getElementById('cld-server');

        // 1. Svr -> IGW
        movePacket(p, svr, igw, 600).then(() => {
            flashNode(igw, 'var(--accent-success)');

            // 2. IGW -> Out (Fade out)
            p.style.transition = "all 0.5s";
            p.style.top = "0%";
            p.style.opacity = "0";

            setTimeout(() => {
                p.remove();
                showToast("Ping Successful!");
            }, 500);
        });
    });

    // Helper functions are reused from previous scope/global
    // Re-declaring packet helpers here for safety if previous closure didn't expose them
    function createPacket() {
        const p = document.createElement('div');
        p.classList.add('packet');
        return p;
    }

    function movePacket(packet, fromNode, toNode, duration) {
        return new Promise(resolve => {
            const canvasRect = document.getElementById('canvas-container').getBoundingClientRect();
            const start = fromNode.getBoundingClientRect();
            const end = toNode.getBoundingClientRect();

            packet.style.left = (start.left - canvasRect.left + start.width / 2) + 'px';
            packet.style.top = (start.top - canvasRect.top + start.height / 2) + 'px';
            packet.style.transition = `all ${duration}ms linear`;

            packet.offsetWidth;

            packet.style.left = (end.left - canvasRect.left + end.width / 2) + 'px';
            packet.style.top = (end.top - canvasRect.top + end.height / 2) + 'px';

            setTimeout(resolve, duration);
        });
    }

    function flashNode(node, color) {
        const oldShadow = node.style.boxShadow;
        node.style.boxShadow = `0 0 20px ${color}`;
        setTimeout(() => node.style.boxShadow = oldShadow, 500);
    }

    function showToast(msg) {
        const t = document.createElement('div');
        t.innerText = msg;
        t.style.position = 'absolute';
        t.style.bottom = '20px';
        t.style.left = '50%';
        t.style.transform = 'translateX(-50%)';
        t.style.background = 'rgba(0,0,0,0.8)';
        t.style.border = '1px solid var(--accent-success)'; // Success green for this phase
        t.style.padding = '8px 16px';
        t.style.borderRadius = '4px';
        t.style.color = 'white';
        t.style.fontSize = '12px';
        canvasContainer.appendChild(t);
        setTimeout(() => t.remove(), 2000);
    }
}

// --- Phase 5 Logic: Microservices & Containers ---
function initPhase5() {
    // Narrative
    const controlsHtml = `
        <div class="concept-card">
            <h3>9. Containers vs Servers</h3>
            <p><strong>Traditional Server:</strong> Like a <strong>Restaurant</strong>. Fixed location, hard to move, slow setup.</p>
            <p><strong>Container:</strong> Like a <strong>Food Truck</strong>. Pre-packaged, drive it anywhere, starts instantly.</p>
        </div>

        <div class="concept-card">
            <h3>10. Docker Networking (Port Mapping)</h3>
            <p>Containers live in a private "Bridge Network". To reach them, we map a <strong>Host Port</strong> to the <strong>Container Port</strong>.</p>
            
            <div style="background:rgba(0,0,0,0.3); padding:10px; border-radius:6px; margin-top:10px;">
                <div style="font-size:12px; margin-bottom:5px;">Configure Port Map:</div>
                <div style="display:flex; align-items:center; gap:5px; font-family:var(--font-mono);">
                    <span>Host :</span>
                    <input type="number" id="host-port" value="8080" style="width:60px; padding:4px; border-radius:4px; border:1px solid var(--border-color); background:var(--bg-dark); color:white;">
                    <span>➜</span>
                    <span>Container :</span>
                    <input type="number" id="container-port" value="80" style="width:50px; padding:4px; border-radius:4px; border:1px solid var(--border-color); background:var(--bg-dark); color:white;" readonly>
                </div>
            </div>

            <div style="margin-top: 15px; display:flex; gap:10px;">
                <button class="action-btn" id="btn-send-8080">Send to :8080</button>
                <button class="action-btn" id="btn-send-80" style="border-color:var(--accent-danger)">Send to :80</button>
            </div>
            <div id="docker-log" class="console-output" style="height:40px; margin-top:10px;">Waiting for traffic...</div>
        </div>
    `;
    controlsArea.innerHTML = controlsHtml;

    // Visualizer
    canvasContainer.innerHTML = `
        <!-- Host Machine -->
        <div style="position: absolute; top: 50%; left: 60%; transform: translate(-50%, -50%); width: 250px; height: 250px; border: 2px solid var(--text-muted); border-radius: 12px; background: #1e293b;">
            <div style="position:absolute; top:-12px; left:10px; background:var(--bg-panel); padding:0 5px; color:var(--text-muted); font-size:12px;">Host Server (Physical)</div>
            
            <!-- Host Port "Socket" -->
            <div id="host-socket" style="position:absolute; top:40%; left:-12px; width:24px; height:24px; background:var(--accent-primary); border-radius:50%; display:flex; align-items:center; justify-content:center; font-size:10px; font-weight:bold; box-shadow:0 0 10px var(--accent-primary); z-index:10;">
                <span style="position:absolute; left:-35px; color:var(--accent-primary); font-family:var(--font-mono);">:8080</span>
            </div>

            <!-- Docker Daemon / Bridge Net -->
            <div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 200px; height: 180px; border: 2px dashed rgba(255,255,255,0.2); border-radius: 8px;">
                <div style="text-align:center; font-size:10px; color:rgba(255,255,255,0.4); margin-top:5px;">Docker Bridge Network</div>
                
                <!-- Container -->
                <div class="sim-node" id="container-node" style="top: 60%; left: 50%; transform: translate(-50%, -50%); width: 100px; height: 80px; border-color: #0db7ed;">
                    <div class="sim-node-icon">🚚</div>
                    <div class="sim-node-label">Container<br><span style="font-size:8px; color:#0db7ed;">App V1</span></div>
                    
                    <!-- Container Port -->
                    <div id="container-socket" style="position:absolute; left:-6px; top:50%; transform:translateY(-50%); width:12px; height:12px; background:#0db7ed; border-radius:50%;"></div>
                    <div style="position:absolute; left:-25px; top:50%; transform:translateY(-50%); font-size:8px; color:#0db7ed; font-family:var(--font-mono);">:80</div>
                </div>
                
                <!-- Mapping Line -->
                <svg style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none;">
                    <path d="M -15 90 Q 20 90 40 100" stroke="rgba(13, 183, 237, 0.5)" stroke-width="2" fill="none" stroke-dasharray="4,4" />
                </svg>
            </div>
        </div>

        <!-- User -->
        <div class="sim-node" id="user-p5" style="top: 50%; left: 10%; transform: translate(-50%, -50%); border-color:white;">
            <div class="sim-node-icon">👤</div>
            <div class="sim-node-label">User</div>
        </div>
    `;

    // Logic
    const log = document.getElementById('docker-log');
    const hostInput = document.getElementById('host-port');

    // Update Visual Port Label on Input Change
    hostInput.addEventListener('input', (e) => {
        const val = e.target.value;
        const hostLabel = document.querySelector('#host-socket span');
        hostLabel.textContent = `:${val}`;
    });

    document.getElementById('btn-send-8080').addEventListener('click', () => {
        const configuredPort = hostInput.value;
        if (configuredPort !== '8080') {
            animateDockerPacket(8080, false); // Fail if config changed but user hits "Send to 8080" specifically? 
            // Actually, let's assume the button sends to *actual* 8080. If config is 8080, it works.
            // If user changed config to 9000, then 8080 is closed.
        }
        animateDockerPacket(8080, configuredPort === '8080');
    });

    document.getElementById('btn-send-80').addEventListener('click', () => {
        animateDockerPacket(80, false);
    });

    function animateDockerPacket(targetPort, isOpen) {
        const p = createPacket();
        canvasContainer.appendChild(p);
        p.style.backgroundColor = 'white';

        const user = document.getElementById('user-p5');
        const hostSocket = document.getElementById('host-socket');
        // Hacky target for "Container Port direct" which doesn't exist externally
        // We'll just aim at the host wall and fail.

        if (targetPort === 80) {
            // Trying to hit :80 directly from outside
            // Aim at middle of Host left border
            const hostBox = document.querySelector('#host-socket').parentElement;

            movePacket(p, user, hostBox, 800).then(() => {
                p.style.backgroundColor = 'red';
                p.style.transform = 'scale(2)';
                flashNode(hostBox, 'red');
                log.innerText = "Error: Container Port :80 is NOT exposed directly!";
                log.style.color = "var(--accent-danger)";
                setTimeout(() => p.remove(), 300);
            });
            return;
        }

        // Target :8080 (or whatever host port)
        movePacket(p, user, hostSocket, 800).then(() => {
            if (isOpen) {
                // Flash Host Port
                flashNode(hostSocket, 'var(--accent-primary)');
                log.innerText = "Hit Host Port :8080...";
                log.style.color = "var(--text-main)";

                // Animate Mapping: Host Socket -> Container Socket
                const contSocket = document.getElementById('container-socket');

                // We need custom move here because nodes are nested differently
                setTimeout(() => {
                    // Create internal packet relative to canvas
                    p.style.transition = 'all 0.5s ease-in-out';

                    const end = contSocket.getBoundingClientRect();
                    const canvasRect = canvasContainer.getBoundingClientRect();

                    p.style.left = (end.left - canvasRect.left) + 'px';
                    p.style.top = (end.top - canvasRect.top) + 'px';
                    p.style.backgroundColor = '#0db7ed'; // Docker Blue

                    setTimeout(() => {
                        flashNode(document.getElementById('container-node'), '#0db7ed');
                        log.innerText = "Mapped to Container :80. Success!";
                        log.style.color = "#0db7ed";
                        p.remove();
                    }, 500);
                }, 100);

            } else {
                // Port Closed (e.g. if we changed config) or wrong port
                p.style.backgroundColor = 'red';
                p.style.transform = 'scale(2)';
                log.innerText = `Error: Host Port :${targetPort} is closed.`;
                setTimeout(() => p.remove(), 300);
            }
        });
    }

    // Reuse helpers
    function createPacket() {
        const p = document.createElement('div');
        p.classList.add('packet');
        return p;
    }

    function movePacket(packet, fromNode, toNode, duration) {
        return new Promise(resolve => {
            const canvasRect = document.getElementById('canvas-container').getBoundingClientRect();
            const start = fromNode.getBoundingClientRect();
            const end = toNode.getBoundingClientRect();

            packet.style.left = (start.left - canvasRect.left + start.width / 2) + 'px';
            packet.style.top = (start.top - canvasRect.top + start.height / 2) + 'px';
            packet.style.transition = `all ${duration}ms linear`;

            packet.offsetWidth;

            packet.style.left = (end.left - canvasRect.left + end.width / 2) + 'px';
            packet.style.top = (end.top - canvasRect.top + end.height / 2) + 'px';

            setTimeout(resolve, duration);
        });
    }

    function flashNode(node, color) {
        const oldShadow = node.style.boxShadow;
        node.style.boxShadow = `0 0 20px ${color}`;
        setTimeout(() => node.style.boxShadow = oldShadow, 500);
    }
}

// --- Phase 6 Logic: Orchestration (Kubernetes) ---
function initPhase6() {
    // Narrative
    const controlsHtml = `
        <div class="concept-card">
            <h3>11. Pods (Ephemeral Units)</h3>
            <p><strong>Concept:</strong> Pods are like <strong>Apartment Units</strong>. They can "crash" (burn down) and be replaced instantly.</p>
            <p><strong>Action:</strong> Click a Pod to ☠️ <strong>CRASH</strong> it and watch K8s self-heal.</p>
        </div>

        <div class="concept-card">
            <h3>12. Services (Stable Networking)</h3>
            <p><strong>Problem:</strong> Pod IPs change when they restart.</p>
            <p><strong>Solution:</strong> A <strong>Service</strong> is a stable "Reception Desk" (Fixed IP) that routes traffic to <em>any</em> healthy Pod.</p>
            <button class="action-btn" id="btn-call-service">Call Service (DB-SVC)</button>
            <div id="k8s-log" class="console-output" style="height:50px; margin-top:10px; overflow-y:auto;">Cluster is healthy.</div>
        </div>
    `;
    controlsArea.innerHTML = controlsHtml;

    // Visualizer
    canvasContainer.innerHTML = `
        <!-- K8s Node -->
        <div style="position: absolute; top: 50%; left: 60%; transform: translate(-50%, -50%); width: 320px; height: 260px; border: 2px dashed #326ce5; border-radius: 12px; background: rgba(50, 108, 229, 0.1);">
            <div style="position:absolute; top:-12px; left:10px; background:var(--bg-panel); padding:0 5px; color:#326ce5; font-size:12px; font-weight:bold;">Kubernetes Node</div>
            
            <!-- Service (Stable VIP) -->
            <div class="sim-node" id="svc-node" style="top: 20%; left: 50%; transform: translate(-50%, -50%); width: 280px; height: 50px; border-color: #326ce5; flex-direction:row; gap:10px;">
                <div class="sim-node-icon" style="font-size:16px;">⚡</div>
                <div class="sim-node-label" style="text-align:left;"><strong>Service: db-svc</strong><br>IP: 10.96.0.1 (STABLE)</div>
            </div>

            <!-- Pods Container -->
            <div id="pods-area" style="position: absolute; bottom: 10px; left: 10px; right: 10px; height: 160px; display: flex; gap: 10px; justify-content: center; align-items: center;">
                <!-- Pods injected here -->
            </div>
        </div>

        <!-- User -->
        <div class="sim-node" id="user-p6" style="top: 50%; left: 10%; transform: translate(-50%, -50%); border-color:white;">
            <div class="sim-node-icon">👤</div>
            <div class="sim-node-label">User</div>
        </div>
    `;

    // State
    let podCount = 0;
    const pods = [];

    // Init - Spawn 2 Pods
    spawnPod();
    spawnPod();

    // Logic
    const log = document.getElementById('k8s-log');

    document.getElementById('btn-call-service').addEventListener('click', () => {
        // Round Robin or Random healthy pod
        const healthyPods = pods.filter(p => !p.isDead);

        if (healthyPods.length === 0) {
            log.innerHTML += `<div style="color:red">Error: No healthy pods!</div>`;
            return;
        }

        const targetPod = healthyPods[Math.floor(Math.random() * healthyPods.length)];

        // Anim: User -> Service -> Pod
        const user = document.getElementById('user-p6');
        const svc = document.getElementById('svc-node');
        const p = createPacket();
        canvasContainer.appendChild(p);
        p.style.backgroundColor = 'white';

        // 1. User -> Service
        movePacket(p, user, svc, 600).then(() => {
            flashNode(svc, '#326ce5');
            log.innerHTML += `<div>> Service: Routing to Pod ${targetPod.id}...</div>`;
            log.scrollTop = log.scrollHeight;

            // 2. Service -> Pod
            movePacket(p, svc, targetPod.element, 600).then(() => {
                flashNode(targetPod.element, 'var(--accent-success)');
                log.innerHTML += `<div style="color:var(--accent-success)">> Pod ${targetPod.id} handled request.</div>`;
                log.scrollTop = log.scrollHeight;
                p.remove();
            });
        });
    });

    function spawnPod() {
        podCount++;
        const id = podCount;
        const shortIp = `10.244.1.${10 + id}`;

        const podEl = document.createElement('div');
        podEl.className = 'sim-node';
        podEl.style.position = 'relative';
        podEl.style.top = '0';
        podEl.style.transform = 'none'; // Flex layout
        podEl.style.width = '90px';
        podEl.style.height = '90px';
        podEl.style.borderColor = 'var(--accent-success)';
        podEl.style.cursor = 'pointer';
        podEl.title = "Click to Crash Pod";

        podEl.innerHTML = `
            <div class="sim-node-icon">🥡</div>
            <div class="sim-node-label">Pod-${id}<br><span style="font-size:8px;">${shortIp}</span></div>
            <div style="position:absolute; top:-5px; right:-5px; font-size:10px;">🟢</div>
        `;

        // Crash Handler
        podEl.addEventListener('click', () => {
            killPod(id);
        });

        document.getElementById('pods-area').appendChild(podEl);

        // Push to state
        const podData = { id, element: podEl, isDead: false };
        pods.push(podData);

        // Entrance Anim
        podEl.style.opacity = '0';
        podEl.style.transform = 'scale(0.5)';
        setTimeout(() => {
            podEl.style.transition = 'all 0.3s ease-out';
            podEl.style.opacity = '1';
            podEl.style.transform = 'scale(1)';
        }, 50);

        return podData;
    }

    function killPod(id) {
        const podObj = pods.find(p => p.id === id);
        if (!podObj || podObj.isDead) return;

        podObj.isDead = true;
        log.innerHTML += `<div style="color:var(--accent-danger)">> Pod-${id} CRASHED!</div>`;

        // Visual Death
        const el = podObj.element;
        el.style.borderColor = 'var(--accent-danger)';
        el.style.backgroundColor = 'rgba(239, 68, 68, 0.2)';
        el.querySelector('.sim-node-icon').innerText = '☠️';
        el.querySelector('div:last-child').innerText = '🔴';

        // Remove after delay
        setTimeout(() => {
            el.style.transform = 'scale(0)';
            el.style.opacity = '0';
            setTimeout(() => {
                el.remove();
                // Remove from array
                const idx = pods.indexOf(podObj);
                if (idx > -1) pods.splice(idx, 1);

                // Self Heal !!
                log.innerHTML += `<div style="color:#326ce5">> K8s: Self-healing... Spawning new replica.</div>`;
                log.scrollTop = log.scrollHeight;
                setTimeout(spawnPod, 500);
            }, 300);
        }, 800);
    }

    // Reuse helpers
    function createPacket() {
        const p = document.createElement('div');
        p.classList.add('packet');
        return p;
    }

    function movePacket(packet, fromNode, toNode, duration) {
        return new Promise(resolve => {
            const canvasRect = document.getElementById('canvas-container').getBoundingClientRect();
            const start = fromNode.getBoundingClientRect();
            const end = toNode.getBoundingClientRect();

            packet.style.left = (start.left - canvasRect.left + start.width / 2) + 'px';
            packet.style.top = (start.top - canvasRect.top + start.height / 2) + 'px';
            packet.style.transition = `all ${duration}ms linear`;

            packet.offsetWidth;

            packet.style.left = (end.left - canvasRect.left + end.width / 2) + 'px';
            packet.style.top = (end.top - canvasRect.top + end.height / 2) + 'px';

            setTimeout(resolve, duration);
        });
    }

    function flashNode(node, color) {
        const oldShadow = node.style.boxShadow;
        node.style.boxShadow = `0 0 20px ${color}`;
        setTimeout(() => node.style.boxShadow = oldShadow, 500);
    }
}
