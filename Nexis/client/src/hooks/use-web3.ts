import { useAccount, useConnect, useDisconnect } from 'wagmi'
import { modal } from '@/lib/web3-config'

export function useWeb3() {
  const { address, isConnected } = useAccount()
  const { disconnect } = useDisconnect()

  const openModal = () => modal.open()
  const closeModal = () => modal.close()

  return {
    address,
    isConnected,
    connect: openModal,
    disconnect,
    openModal,
    closeModal
  }
}