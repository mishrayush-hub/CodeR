import React, { useEffect, useRef, useState } from "react";
import { useParams, useLocation , useNavigate, Navigate} from "react-router-dom";
import toast from 'react-hot-toast';
import Editor from "../components/editor";
import Leftpanel from "../components/leftpanel";
import Chatpanel from "../components/chat";
import { initSocket } from "../socket"; 

function HostPage() {
    const socketRef = useRef(null);
    const { roomid } = useParams();
    const location = useLocation();
    const [socketid, setSocket] = useState();
    const [joiners, setjoiners] = useState([]);
    const reactNavigator = useNavigate();
    const isHost = location.pathname.includes("/host");
    const [code, setCode] = useState("");
    const [clientCode, setClientCode] = useState("");
    const [clientSocketid, setClientSocketid] = useState(null);
    const [socketReady, setSocketReady] = useState(false);
    const [messages, setMessages] = useState([]);

    const handleClient = (client) => {
        console.log("🔍 Client Selection Process:", {
            selectedClient: client,
            currentClientSocketId: clientSocketid,
            currentSocketId: socketRef.current?.id
        });

        // If selecting the same client, deselect
        if (clientSocketid === client.socketId) {
            console.log("🔄 Deselecting client");
            setClientCode("");
            setClientSocketid(null);
            return;
        }

        // Verify socket is initialized and in the correct state
        if (!socketRef.current) {
            console.error("❌ Socket not initialized");
            return;
        }

        // Set the new client socket ID
        setClientSocketid(client.socketId);

        // Request client code with additional context
        socketRef.current.emit('request_clientcode', { 
            roomId: roomid, 
            targetSocketid: client.socketId,
            requesterSocketId: socketRef.current.id  // Add requester context
        });
    };

    useEffect(() => {
        const init = async () => {
            if (!roomid) return; // ✅ Prevent errors if roomid is missing

            socketRef.current = await initSocket();
            socketRef.current.on('connect_error', (err) => handleErrors(err));
            socketRef.current.on('connect_failed', (err) => handleErrors(err));

            function handleErrors(e) {
                console.error("Socket error:", e);
                toast.error('Socket connecton failed. Please try again later.');
                reactNavigator('/');
            }

            socketRef.current.emit("join", {
                roomId: roomid,
                username: location.state?.joinName,
                hostname: location.state?.hostName,
            });

            //Listening for joined event
            socketRef.current.on('joined', ({ clients, username, socketId }) => {
                if (socketRef.current.id === socketId) {
                    setSocket(socketId);
                }

                if(username !== location.state?.username) {
                     toast.success(`${username} joined the room.`);
                     console.log(`${username} joined`);
                    }

                setjoiners(clients);
                }
            );

            //listening to code changed
            socketRef.current.on('code_changed', ({ codee, sourceSocketId }) => {
                console.log("📥 Code Received:", { 
                    codeLength: codee.length, 
                    sourceSocketId,
                    currentClientSocketId: clientSocketid
                });

                // Only update if not in client selection mode
                if (!clientSocketid) {
                    setCode(codee);
                }
            });

            //listenong for client code response
            socketRef.current.on('client_code_response', ({ codee, sourceSocketId }) => {
                console.log("Received client code:", codee);
                if(sourceSocketId === clientSocketid) {
                    setCode(codee);
                    console.log("Received client code:", codee);
                }
            });

            //listening to chat-messages
            socketRef.current.on('receive_chat_message', ( messageData ) => {
                console.log("📥 Chat Message Received:", messageData);
                setMessages(messageData);
            })

            //listening for disconneted
            socketRef.current.on('disconnected', ({socketId, username}) => {
                toast.success(`${username} left the room.`)
                setjoiners((prev) => {
                    return prev.filter((joiners) => joiners.socketId !== socketId);
                })
            });
        };
        init();

        return () => {
            socketRef.current?.disconnect(); // ✅ Cleanup to prevent duplicate sockets
        };
    }, [roomid, location.state, clientSocketid]); // ✅ Added dependencies

    if(!location.state) {
        return <Navigate to="/" />
    }

    return (
        <div className="flex h-screen w-screen bg-gray-900 text-white">
            {isHost && <Leftpanel className="w-1/5" joiners={joiners} socketId={socketid}
                onClientSelect={handleClient}
                clientSocketid={clientSocketid}
                />}

            <div className={`${isHost ? "w-3/5" : "w-4/5"} flex flex-col items-center justify-center`}>
                {!isHost && (
                    <div className="absolute top-4 text-4xl font-bold text-gray-400 mb-4">
                        CodeR
                    </div>
                )}
                <Editor roomId={roomid} socketRef={socketRef} code={code} />
            </div>

            <Chatpanel className="w-1/5" clientMessages={messages.messageData} socketRef={socketRef} roomId={roomid} />
        </div>
    );
}

export default HostPage;
