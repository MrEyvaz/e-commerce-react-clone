import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { db } from '../../../FireStore/FireStore'
import NavbarAdmin from '../navbarAdmin/NavbarAdmin'
import styles from "./CustomerAdmin.module.css"

function CustomerAdmin() {
    const [customers, setCustomers] = useState([])

    useEffect(() => {
        const fetchCustomers = async () => {
            try {
                const querySnapshot = await getDocs(collection(db, "formDatas"))
                const customerList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data()
                }))
                setCustomers(customerList)
            } catch (error) {
                toast.error("Failed to load customer data")
            }
        }
        fetchCustomers()
    }, [])

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db, "formDatas", id))
            setCustomers(customers.filter((customer) => customer.id !== id))
            toast.success("Customer deleted successfully")
        } catch (error) {
            toast.error("Failed to delete customer")
        }
    }

    return (
        <div>
            <NavbarAdmin />
            {customers.length > 0 ? (
                <div className="my-5">
                    <h2 className={styles.heading}>Customer Contact Details</h2>
                    <table className={styles.table}>
                        <thead className="fs-5">
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Message</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customers.map((customer) => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.name}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.phone}</td>
                                    <td>{customer.message}</td>
                                    <td>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleDelete(customer.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
                <div className="my-5">
                    <h2 className={styles.heading}>Customer Contact Details</h2>
                    <p className={styles.noCustomersFind}>No customer data found</p>
                </div>
            )}
        </div>
    );

}

export default CustomerAdmin