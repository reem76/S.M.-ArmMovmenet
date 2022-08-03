// take the speech and convert it to text
		
		window.SpeechRecognition=window.webkitSpeechRecognition;
	
		const recognition= new SpeechRecognition();
		recognition.lang = 'ar-SA';
		recognition.continuous = true;
		recognition.interimResults=true;
		
		var transcript;
		
		START.addEventListener('click',function(){
		
		recognition.onstart = function() {
			document.getElementById("state").innerHTML="جاري الاستماع";
			}
		recognition.onend = function() {
			document.getElementById("state").innerHTML="توقف عن الاستماع";
			}
		recognition.start();
		recognition.onresult = e => {
		  transcript= Array.from(e.results)
			.map(e => e[0])
			.map(e => e.transcript)
			.join('')
		text.innerHTML=transcript;
		
		console.log(transcript);
		webSerialAPI();		
		};
	})
	
	STOP.addEventListener('click',function(){
	recognition.stop();
	})
	
	
/*async function getCommand() {

  try {
    const co = transcript;
    const resultSplit = result.split(" ")
    const resultCommand = resultSplit.slice(-1);
    if (resultCommand.includes("right") || resultCommand.includes("يمين") || resultCommand.includes("رايت")) {
	  await writer.write(textEncoder.encode('right'));
    }

    if (resultCommand.includes("left") || resultCommand.includes("يسار") || resultCommand.includes("لفت")) {
      await writer.write(textEncoder.encode('left'));
    }

  } catch (e) {
    console.log(e);
    }

}*/
	 
	
	//serial port
	async function webSerialAPI(){
		try {
		const serialPort=null;
		
		if ("serial" in navigator) {
			console.log("The Web Serial API is supported");
			// Prompt user to select any serial port.
			 serialPort = await navigator.serial.requestPort();
			
		}
		else {
			alert('Web Serial API not supported.');
		}

	//Get all serial ports the user has previously granted the website access to.
		const allSerialPort = await navigator.serial.getPorts();
					console.log("The Web ");
	  
	//Filter on devices with the Arduino Uno USB Vendor/Product IDs.
		const filters = [
			{ usbVendorId: 0x2341, usbProductId: 0x0043 },
			{ usbVendorId: 0x2341, usbProductId: 0x0001 }
		];

	//###############################################################################################
	/*const filters = [
			{vendorId: 0x1209, productId: 0xa800},
			{vendorId: 0x1209, productId: 0xa850}
		  ];
		navigator.usb.requestDevice({filters: filters})
		.then((usbDevice) => {
		console.log(`Product name: ${usbDevice.productName}`);
		})
		.catch((e) => {
		console.log(`There is no device. ${e}`);
		});*/
	//############################################################################################

	// Prompt user to select an Arduino Uno device.
		 serialPort = await navigator.serial.requestPort({ filters });
		 			console.log("The Web Serial");

		const { usbProductId, usbVendorId } = serialPort.getInfo();

	// Wait for the serial port to open.
		await serialPort.open({ baudRate: 9600 });
			console.log("The Web Serial API ");

	//Write to a serial port to send data to a serial device
		//const writer = serialPort.writable.getWriter();
		const textEncoder = new TextEncoderStream();
		const writableStreamClosed = textEncoder.readable.pipeTo(serialPort.writable);
			console.log("The Web Serial API is ");

		const writer = textEncoder.writable.getWriter();
			console.log("The Web Serial API is supported");

		await writer.write(function(){
			const comm = transcript;
    const commSplit = comm.split(" ")
    const resultCommand = commSplit.slice(-1);
			if(resultCommand.includes("يمين")|| resultCommand.includes("رايت")){
				alert("يمين");
				return "يمين";
			}
			if(resultCommand.includes("يسار")|| resultCommand.includes("لفت")){
				alert("يسار");
				return "يسار";
			}
		});
			console.log("  supported");


	// Allow the serial port to be closed later.
		writer.releaseLock();
			console.log("is supported");

		await port.close();
	 
	 } catch (e) {
		console.log(e);
    }
 
 }
 

