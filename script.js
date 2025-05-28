document.getElementById("badgeForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const name = document.getElementById("name").value;
  const salt = Math.random().toString(36).substring(2, 10);

  const hash = CryptoJS.SHA256(email + salt).toString();
  const identity = `sha256$${hash}`;

  const badge = {
    "@context": "https://w3id.org/openbadges/v2",
    type: "Assertion",
    id: `https://yourdomain.com/assertions/${Date.now()}`,
    recipient: {
      type: "email",
      hashed: true,
      salt: salt,
      identity: identity
    },
    badge: "https://yourdomain.com/badgeclass.json",
    verification: {
      type: "HostedBadge"
    },
    issuedOn: new Date().toISOString(),
    evidence: `https://yourdomain.com/evidence/${Date.now()}`
  };

  document.getElementById("output").textContent = JSON.stringify(badge, null, 2);

  const blob = new Blob([JSON.stringify(badge, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "badge.json";
  a.textContent = "Download your badge JSON";
  document.getElementById("output").appendChild(document.createElement("br"));
  document.getElementById("output").appendChild(a);
});
