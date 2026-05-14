// Initialize Phone Selector
const phoneInput = document.querySelector("#phone");
const iti = window.intlTelInput(phoneInput, {
    initialCountry: "zm",
    separateDialCode: true,
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

// Handle Registration and Payment
document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (typeof LencoPay === 'undefined') {
        alert("Payment gateway is still loading. Please wait 2 seconds.");
        return;
    }

    const email = document.getElementById('email').value;
    const fullName = document.getElementById('full_name').value;

    LencoPay.getPaid({
        key: 'pub-88dd921c0ecd73590459a1dd5a9343c77db0f3c344f222b9', // Sandbox Public Key
        reference: 'USPIRE-' + Date.now(),
        email: email,
        amount: 5000, // ZMW
        currency: "ZMW",
        channels: ["card", "mobile-money"],
        customer: {
            firstName: fullName,
            phone: iti.getNumber(),
        },
        onSuccess: function (response) {
            showSuccessUI();
        },
        onClose: function () {
            console.log('Payment window closed.');
        }
    });
});

function showSuccessUI() {
    document.getElementById('form-container').innerHTML = `
        <div class="h-full flex flex-col items-center justify-center py-20 text-center">
            <div class="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-8 border-4 border-green-100 text-3xl text-green-500">✓</div>
            <h2 class="text-3xl font-black text-slate-900 mb-4">Registration Successful!</h2>
            <p class="text-slate-500 max-w-xs mx-auto mb-10 leading-relaxed font-medium">Expect to hear from the Uspire Team shortly.</p>
            <div class="space-y-1">
                <p class="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Best Wishes,</p>
                <p class="text-[#4a148c] font-black text-xl">Uspire Team!</p>
            </div>
            <button onclick="location.reload()" class="mt-12 text-[#4a148c] font-bold uppercase text-[10px] tracking-widest hover:underline">Return to Hub</button>
        </div>
    `;
}