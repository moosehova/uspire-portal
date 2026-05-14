// Initialize Phone Selector
const phoneInput = document.querySelector("#phone");
const iti = window.intlTelInput(phoneInput, {
    initialCountry: "zm",
    separateDialCode: true,
    utilsScript: "https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/17.0.8/js/utils.js",
});

// Helper for Premium Notifications
function showToast(message, type = 'error') {
    const toast = document.getElementById('notification-toast');
    const icon = document.getElementById('toast-icon');
    const msg = document.getElementById('toast-message');

    msg.innerText = message;
    icon.className = type === 'success' ? 'w-8 h-8 rounded-full flex items-center justify-center bg-green-500' : 'w-8 h-8 rounded-full flex items-center justify-center bg-red-500';
    icon.innerHTML = type === 'success' ? '✓' : '!';

    toast.classList.remove('hidden');
    setTimeout(() => toast.classList.add('hidden'), 4000);
}

document.getElementById('registrationForm').addEventListener('submit', function(e) {
    e.preventDefault();

    if (typeof LencoPay === 'undefined') {
        showToast("Payment system is warming up...");
        return;
    }

    try {
        const email = document.getElementById('email').value; // Explicitly capturing email
        const fullName = document.getElementById('full_name').value;
        const occupation = document.getElementById('occupation').value;
        const gender = document.getElementById('gender').value;

        LencoPay.getPaid({
            key: 'pub-88dd921c0ecd73590459a1dd5a9343c77db0f3c344f222b9',
            reference: 'USPIRE-' + Date.now(),
            email: email, // Email passed to gateway
            amount: 5000,
            currency: "ZMW",
            customer: {
                firstName: fullName,
                phone: iti.getNumber(),
            },
            metadata: { occupation, gender },
            onSuccess: () => showSuccessUI(),
            onClose: () => console.log('Window closed')
        });
    } catch (error) {
        showToast("Please check all fields"); // Replacing the basic alert in image_87c25b.png
    }
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
function startCountdown() {
    const deadline = new Date("June 30, 2026 23:59:59").getTime();

    const timer = setInterval(function() {
        const now = new Date().getTime();
        const distance = deadline - now;

        // Time calculations
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the results
        document.getElementById("days").innerHTML = days.toString().padStart(2, '0');
        document.getElementById("hours").innerHTML = hours.toString().padStart(2, '0');
        document.getElementById("minutes").innerHTML = minutes.toString().padStart(2, '0');
        document.getElementById("seconds").innerHTML = seconds.toString().padStart(2, '0');

        // If the countdown is finished
        if (distance < 0) {
            clearInterval(timer);
            document.getElementById("form-container").innerHTML = `
                <div class="p-20 text-center">
                    <h2 class="text-3xl font-black text-slate-900">Registration Closed</h2>
                    <p class="text-slate-500 mt-4">This intake is full. Follow us for future dates.</p>
                </div>`;
        }
    }, 1000);
}

// Initialize on load
startCountdown();