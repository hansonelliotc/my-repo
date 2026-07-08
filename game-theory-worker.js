self.onmessage = function(event) {
    const number = event.data;

    // Perform your heavy calculation here
    let result = 0;
    for (let i = 0; i < number; i++) {
        result += i;
    }

    // Send the final result back to the main thread
    self.postMessage(result);
};